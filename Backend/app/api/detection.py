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

@router.post("/detect", response_model=HistoryResponse)
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
    # Check size using FastAPI's built-in property (avoids buggy seek operations)
    file_size = file.size or 0
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds {MAX_FILE_SIZE // (1024 * 1024)}MB limit."
        )
    
    # 3. Save the file temporarily for duration check and processing
    from pathlib import Path
    upload_dir = Path(settings.UPLOAD_DIR).absolute()
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    file_ext = Path(file.filename).suffix
    saved_filename = f"{uuid.uuid4()}{file_ext}"
    file_path_obj = upload_dir / saved_filename
    file_path = str(file_path_obj)
    
    # Atomic write: safe read via FastAPI's async read
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)
        f.flush()
        os.fsync(f.fileno()) # Force write to disk

    
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
            "start_time": datetime.now()
        },
        "created_at": datetime.now()
    }
    
    result = await db.history.insert_one(history_data)
    history_id = str(result.inserted_id)
    
    # 6. Launch background analysis
    background_tasks.add_task(process_video_task, history_id, file_path)
    
    # 7. Return the initial pending record
    created_history = await db.history.find_one({"_id": result.inserted_id})
    return created_history