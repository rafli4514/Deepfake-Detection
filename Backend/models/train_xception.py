import os
import cv2
import numpy as np
import tensorflow as tf
from mtcnn import MTCNN
from tqdm import tqdm
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.applications import Xception
from tensorflow.keras.applications.xception import preprocess_input
from tensorflow.keras import layers, models, optimizers
import tensorflow.keras.metrics as metrics
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# --- KONFIGURASI ---
DATASET_BASE = "models/Dataset"
ASLI_DIR = os.path.join(DATASET_BASE, "Asli")
PALSU_DIR = os.path.join(DATASET_BASE, "Palsu")
OUTPUT_EXTRACTED = os.path.join(DATASET_BASE, "extracted_faces")

IMG_SIZE = (299, 299)
BATCH_SIZE = 32
NUM_FRAMES_PER_VIDEO = 10  # Mengambil 10 frame secara merata

# --- 1. EKSTRAKSI WAJAH (MTCNN) ---
def process_video_mtcnn(video_path, label_folder, detector):
    """Mengekstrak wajah dari video tunggal dengan MTCNN."""
    output_dir = os.path.join(OUTPUT_EXTRACTED, label_folder)
    os.makedirs(output_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_frames == 0: return 0
    
    # Frame Sampling secara merata
    frame_indices = np.linspace(0, total_frames - 1, NUM_FRAMES_PER_VIDEO, dtype=int)
    video_name = os.path.splitext(os.path.basename(video_path))[0]
    saved_count = 0
    
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret: continue
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = detector.detect_faces(rgb_frame)
        
        if results:
            # Ambil wajah paling dominan
            x, y, w, h = results[0]['box']
            x, y = max(0, x), max(0, y)
            face_crop = frame[y:y+h, x:x+w]
            
            if face_crop.size != 0:
                face_filename = f"{video_name}_frame{idx}.jpg"
                cv2.imwrite(os.path.join(output_dir, face_filename), face_crop)
                saved_count += 1
    
    cap.release()
    return saved_count

def run_extraction():
    detector = MTCNN()
    
    # Ekstrak Folder Asli (Real)
    print(f"\n[*] Mengekstrak folder Asli: {ASLI_DIR}")
    asli_videos = [os.path.join(ASLI_DIR, f) for f in os.listdir(ASLI_DIR) if f.endswith('.mp4')]
    for v in tqdm(asli_videos, desc="Proses Video Asli"):
        process_video_mtcnn(v, 'real', detector)
        
    # Ekstrak Folder Palsu (Fake)
    print(f"\n[*] Mengekstrak folder Palsu: {PALSU_DIR}")
    palsu_videos = [os.path.join(PALSU_DIR, f) for f in os.listdir(PALSU_DIR) if f.endswith('.mp4')]
    for v in tqdm(palsu_videos, desc="Proses Video Palsu"):
        process_video_mtcnn(v, 'fake', detector)

# --- 2. PENYEIMBANGAN DATASET ---
def get_class_weights():
    classes = ['fake', 'real']
    labels = []
    for i, cls in enumerate(classes):
        path = os.path.join(OUTPUT_EXTRACTED, cls)
        count = len(os.listdir(path))
        labels.extend([i] * count)
        print(f"Dataset {cls}: {count} gambar")
    
    weights = compute_class_weight('balanced', classes=np.unique(labels), y=labels)
    return dict(enumerate(weights))

# --- 3. DATA PIPELINE ---
def get_datasets():
    train_ds = tf.keras.utils.image_dataset_from_directory(
        OUTPUT_EXTRACTED,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='binary'
    )
    
    val_ds = tf.keras.utils.image_dataset_from_directory(
        OUTPUT_EXTRACTED,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='binary'
    )
    
    # Preprocessing Xception [-1, 1]
    train_ds = train_ds.map(lambda x, y: (preprocess_input(x), y)).cache().prefetch(tf.data.AUTOTUNE)
    val_ds = val_ds.map(lambda x, y: (preprocess_input(x), y)).cache().prefetch(tf.data.AUTOTUNE)
    
    return train_ds, val_ds

# --- 4. ARSITEKTUR XCEPTION ---
def build_model():
    base_model = Xception(weights='imagenet', include_top=False, input_shape=(299, 299, 3))
    base_model.trainable = False  # Freeze base
    
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer=optimizers.Adam(learning_rate=1e-4),
        loss='binary_crossentropy',
        metrics=['accuracy', metrics.AUC(name='auc')]
    )
    return model

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    # 1. Ekstraksi (Opsional jika sudah ada)
    # run_extraction()
    
    # 2. Persiapan Data
    class_weights = get_class_weights()
    train_ds, val_ds = get_datasets()
    
    # 3. Training
    model = build_model()
    
    callbacks = [
        EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True),
        ModelCheckpoint('models/xception_model.h5', monitor='val_auc', mode='max', save_best_only=True)
    ]
    
    print("\n[*] Memulai Training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=20,
        class_weight=class_weights,
        callbacks=callbacks
    )
    
    # 4. Evaluasi
    print("\n[*] Mengevaluasi Model...")
    y_true = []
    y_pred = []
    for x, y in val_ds:
        y_true.extend(y.numpy())
        y_pred.extend(model.predict(x, verbose=0))
    
    y_true = np.array(y_true).flatten()
    y_pred = (np.array(y_pred).flatten() > 0.5).astype(int)
    
    print(classification_report(y_true, y_pred, target_names=['Fake', 'Real']))
    
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(8,6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['Fake', 'Real'], yticklabels=['Fake', 'Real'])
    plt.title('Confusion Matrix')
    plt.savefig('models/confusion_matrix.png')
    print("[+] Training Selesai. Model disimpan sebagai 'models/xception_model.h5'")
