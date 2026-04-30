import cv2
import os
import numpy as np
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

    def extract_and_crop_faces(self, file_path: str, output_dir: str, num_frames: int = 15) -> List[str]:
        """
        Extract a fixed number of frames evenly spaced across the video 
        and crop detected faces using MTCNN.
        Returns a list of paths to the saved face images.
        """
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
        
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            return []
        
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames <= 0:
            cap.release()
            return []
            
        # Calculate indices for uniform sampling
        # Example: if total_frames=100 and num_frames=10, we get [0, 11, 22, ..., 99]
        frame_indices = [int(i) for i in np.linspace(0, total_frames - 1, num_frames)]
        
        saved_faces = []
        
        for idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue
            
            # Convert BGR to RGB for MTCNN
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Detect faces
            results = self.detector.detect_faces(rgb_frame)
            
            # Take only the first (most prominent) face for each sampled frame
            if results:
                x, y, w, h = results[0]['box']
                # Ensure coordinates are positive
                x, y = max(0, x), max(0, y)
                
                # Add margin padding (20%)
                pad_w = int(w * 0.2)
                pad_h = int(h * 0.2)
                
                y1 = max(0, y - pad_h)
                y2 = min(frame.shape[0], y + h + pad_h)
                x1 = max(0, x - pad_w)
                x2 = min(frame.shape[1], x + w + pad_w)
                
                face_img = frame[y1:y2, x1:x2]
                
                if face_img.size != 0:
                    face_filename = f"frame_{idx}_face.jpg"
                    face_path = os.path.join(output_dir, face_filename)
                    cv2.imwrite(face_path, face_img)
                    saved_faces.append(face_path)
            
        cap.release()
        return saved_faces

# Singleton instance
video_processor = VideoProcessor()
