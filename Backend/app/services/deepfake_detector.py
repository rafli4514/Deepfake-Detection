import os
import shutil
from datetime import datetime
from bson import ObjectId
from app.core.config import settings
from app.core.database import get_database
from app.schemas.history_schema import AnalysisStatus
from app.services.video_processor import video_processor
from app.services.model_service import model_service

async def process_video_task(history_id: str, file_path: str):
    """
    Background task untuk memproses video:
    1. Update status menjadi PROCESSING
    2. Ekstrak metadata dan frame
    3. Jalankan AI prediction
    4. Update status menjadi COMPLETED/FAILED
    5. Cleanup
    """
    db = get_database()
    start_time = datetime.now()
    
    try:
        # 1. Update status menjadi PROCESSING
        await db.history.update_one(
            {"_id": ObjectId(history_id)},
            {"$set": {"status": AnalysisStatus.PROCESSING}}
        )
        
        # 2. Ekstrak Metadata
        resolution, duration_sec = video_processor.get_video_metadata(file_path)
        
        # 3. Ekstrak Frame (Faces)
        # Create temp direktori untuk wajah
        faces_dir = os.path.join(settings.UPLOAD_DIR, f"faces_{history_id}")
        face_paths = video_processor.extract_and_crop_faces(file_path, faces_dir)
        
        # 4. Jalankan Prediksi
        prediction_result = await model_service.predict(face_paths)
        
        end_time = datetime.now()
        processing_duration = (end_time - start_time).total_seconds()
        
        # 5. Update DB dengan hasil
        update_data = {
            "status": AnalysisStatus.COMPLETED,
            "video_detail.resolution": resolution,
            "video_detail.duration_sec": duration_sec,
            "ai_analysis": {
                "model_name": "Xception-Pure (Integrated)",
                "prediction": prediction_result["prediction"],
                "confidence_score": prediction_result["confidence_score"],
                "faces_detected": prediction_result["faces_detected"],
                "frames_analyzed": len(face_paths)
            },
            "execution_stats": {
                "start_time": start_time,
                "end_time": end_time,
                "processing_duration_sec": round(processing_duration, 2)
            }
        }
        
        await db.history.update_one(
            {"_id": ObjectId(history_id)},
            {"$set": update_data}
        )
        
    except Exception as e:
        # Log error (could use a real logger here)
        print(f"Error in process_video_task: {e}")
        await db.history.update_one(
            {"_id": ObjectId(history_id)},
            {"$set": {
                "status": AnalysisStatus.FAILED,
                "execution_stats.end_time": datetime.now()
            }}
        )
    finally:
        # 6. Cleanup
        # Remove faces directory
        # faces_dir = os.path.join(settings.UPLOAD_DIR, f"faces_{history_id}")
        # if os.path.exists(faces_dir):
        #     shutil.rmtree(faces_dir)
            
        # Remove the uploaded video file
        # if os.path.exists(file_path):
        #     try:
        #         os.remove(file_path)
        #     except Exception as cleanup_error:
        #         print(f"Cleanup error (file): {cleanup_error}")
        pass