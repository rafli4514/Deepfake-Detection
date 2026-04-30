import os
import uuid
import cv2
from fastapi import APIRouter, HTTPException, Depends, status, File, UploadFile, BackgroundTasks
from app.schemas.history_schema import HistoryResponse, AnalysisStatus
from app.core.database import get_database
from app.core.config import settings
from app.api.auth import get_current_user
from app.services.deepfake_detector import process_video_task
from datetime import datetime

router = APIRouter()

# Constants for validation
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB
MAX_DURATION_SEC = 60  # 1 Minute

@router.post("/", response_model=HistoryResponse)
async def upload_and_detect(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Upload video file untuk deepfake detection.
    Performs initial validation, saves the file, and starts analysis in the background.
    """
    # 1. Validate file type
    if not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File harus berupa video"
        )
    
    # 2. Validasi ukuran file
    # Read content to check size (fast enough for 20MB)
    content = await file.read()
    file_size = len(content)
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds {MAX_FILE_SIZE // (1024 * 1024)}MB limit."
        )
    
    # 3. Save the file temporarily for duration check and processing
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_ext = os.path.splitext(file.filename)[1]
    saved_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, saved_filename)
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    # 4. Validate video duration using OpenCV
    cap = cv2.VideoCapture(file_path)
    if not cap.isOpened():
        os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not open video file for validation."
        )
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps > 0 else 0
    cap.release()
    
    if duration > MAX_DURATION_SEC:
        os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Video duration exceeds {MAX_DURATION_SEC} seconds limit."
        )
    
    # 5. Create PENDING record in DB
    db = get_database()
    history_data = {
        "user_id": str(current_user["_id"]),
        "status": AnalysisStatus.PENDING,
        "video_detail": {
            "original_name": file.filename,
            "saved_name": saved_filename,
            "file_path": file_path,
            "size_mb": round(file_size / (1024 * 1024), 2),
            "format": file_ext.replace(".", "").upper()
        },
        "ai_analysis": {
            "model_name": "EfficientNet-B4-Deepfake (Integrated)",
            "faces_detected": 0,
            "frames_analyzed": 0
        },
        "execution_stats": {
            "start_time": datetime.utcnow()
        },
        "created_at": datetime.utcnow()
    }
    
    result = await db.history.insert_one(history_data)
    history_id = str(result.inserted_id)
    
    # 6. Launch background analysis
    background_tasks.add_task(process_video_task, history_id, file_path)
    
    # 7. Return the initial pending record
    created_history = await db.history.find_one({"_id": result.inserted_id})
    return created_history