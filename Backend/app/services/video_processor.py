import cv2
import os
from typing import Tuple, List, Optional
from mtcnn import MTCNN

class VideoProcessor:
    """
    Service untuk memproses video menggunakan OpenCV dan MTCNN.
    Handles metadata extraction and face cropping for AI analysis.
    """
    def __init__(self):
        # Initialize MTCNN detector for high-quality face detection
        self.detector = MTCNN()

    def get_video_metadata(self, file_path: str) -> Tuple[Optional[str], Optional[float]]:
        """
        Extract resolution and duration from a video file.
        """
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            return None, None
        
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        resolution = f"{width}x{height}"
        duration = frame_count / fps if fps > 0 else 0
        
        cap.release()
        return resolution, round(duration, 2)

    def extract_and_crop_faces(self, file_path: str, output_dir: str, frame_interval: int = 30) -> List[str]:
        """
        Extract frames at intervals and crop detected faces using MTCNN.
        Returns a list of paths to the saved face images.
        """
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            return []
        
        frame_idx = 0
        saved_faces = []
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Process frames at the specified interval
            if frame_idx % frame_interval == 0:
                # Convert BGR to RGB for MTCNN
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                
                # Detect faces
                results = self.detector.detect_faces(rgb_frame)
                
                for i, result in enumerate(results):
                    x, y, w, h = result['box']
                    # Ensure coordinates are positive
                    x, y = max(0, x), max(0, y)
                    
                    # Add some padding to the crop (20%)
                    pad_w = int(w * 0.2)
                    pad_h = int(h * 0.2)
                    
                    y1 = max(0, y - pad_h)
                    y2 = min(frame.shape[0], y + h + pad_h)
                    x1 = max(0, x - pad_w)
                    x2 = min(frame.shape[1], x + w + pad_w)
                    
                    face_img = frame[y1:y2, x1:x2]
                    
                    if face_img.size == 0:
                        continue
                        
                    face_filename = f"frame_{frame_idx}_face_{i}.jpg"
                    face_path = os.path.join(output_dir, face_filename)
                    cv2.imwrite(face_path, face_img)
                    saved_faces.append(face_path)
            
            frame_idx += 1
            
        cap.release()
        return saved_faces

# Singleton instance
video_processor = VideoProcessor()
