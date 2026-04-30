import tensorflow as tf
import numpy as np
import os
import cv2
from typing import List, Dict, Any

class ModelService:
    """
    Service for loading and running inference on the Deepfake Detection model.
    """
    # Secara default, cari model yang disimpan di models/xception_model.h5
    def __init__(self, model_path: str = "models/best_xception_model.h5"):
        self.model_path = model_path
        self.model = None

    def load_model(self):
        """
        Memuat model TensorFlow ke dalam memori.
        """
        # Memastikan direktori models ada
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        
        if os.path.exists(self.model_path):
            try:
                print(f"[*] Memuat Model AI dari {self.model_path}...")
                self.model = tf.keras.models.load_model(self.model_path)
                print("[+] Model AI berhasil dimuat!")
            except Exception as e:
                print(f"[-] Error saat memuat model: {e}")
        else:
            print(f"[!] PERINGATAN: File model tidak ditemukan di {self.model_path}.")
            print("    Pastikan Anda sudah menjalankan proses training di Fase 2.")

    async def predict(self, face_paths: List[str]) -> Dict[str, Any]:
        """
        Melakukan inferensi pada sekumpulan path gambar wajah menggunakan model Xception.
        Mengembalikan skor agregat (rata-rata).
        """
        if not face_paths:
            return {
                "prediction": "UNKNOWN",
                "confidence_score": 0.0,
                "faces_detected": 0
            }

        # --- Preprocessing ---
        if self.model is not None:
            predictions = []
            valid_faces_count = 0
            
            for img_path in face_paths:
                try:
                    # 1. Baca gambar
                    img = cv2.imread(img_path)
                    if img is None:
                        continue
                    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                    
                    # 2. Resize ke resolusi input standar Xception (299x299)
                    img = cv2.resize(img, (299, 299))
                    
                    # 3. Normalisasi piksel ke rentang [-1, 1]
                    img = img.astype('float32')
                    img = (img / 127.5) - 1.0
                    
                    # Ubah bentuk dari (299, 299, 3) menjadi batch berukuran 1 (1, 299, 299, 3)
                    img_array = np.expand_dims(img, axis=0)
                    
                    # 4. Prediksi (Mengembalikan probabilitas 0.0 hingga 1.0)
                    pred_score = self.model.predict(img_array, verbose=0)[0][0]
                    predictions.append(pred_score)
                    valid_faces_count += 1
                    
                except Exception as e:
                    print(f"Error memproses wajah {img_path}: {e}")

            if not predictions:
                return {
                    "prediction": "UNKNOWN",
                    "confidence_score": 0.0,
                    "faces_detected": 0
                }

            # 5. Agregasi Skor (Rata-rata dari semua frame yang diproses)
            avg_score = float(np.mean(predictions))
            
            # 6. Menentukan Kelas Akhir
            # Asumsi image_dataset_from_directory mengurutkan kelas secara alfabet (fake=0, real=1)
            # Jika rata-rata > 0.5, maka secara mayoritas adalah Real.
            prediction_label = "REAL" if avg_score > 0.5 else "FAKE"
            
            # Hitung tingkat keyakinan (confidence)
            if prediction_label == "REAL":
                confidence = avg_score # Misal skor 0.85 = 85% yakin itu Real
            else:
                confidence = 1.0 - avg_score # Misal skor 0.10 = 90% yakin itu Fake
                
            return {
                "prediction": prediction_label,
                "confidence_score": round(confidence, 4),
                "faces_detected": valid_faces_count
            }

        # --- FALLBACK MOCK LOGIC (Hanya jika model belum di-training) ---
        else:
            print("[!] Model belum dimuat. Menggunakan simulasi mock (dummy)...")
            import asyncio, random
            await asyncio.sleep(1.5)
            mock_score = random.uniform(0.1, 0.99)
            prediction = "FAKE" if mock_score > 0.5 else "REAL"
            return {
                "prediction": prediction,
                "confidence_score": round(mock_score, 4),
                "faces_detected": len(face_paths)
            }

# Singleton instance
model_service = ModelService()
