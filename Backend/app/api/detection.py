from fastapi import APIRouter, HTTPException, Depends, status, File, UploadFile
from app.schemas.history_schema import HistoryResponse
from app.core.database import get_database
from app.api.auth import get_current_user
from app.services.deepfake_detector import detect_deepfake
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=HistoryResponse)
async def upload_and_detect(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    # Validate file type
    if not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a video"
        )
    
    # Run detection
    try:
        detection_result = await detect_deepfake(file, str(current_user["_id"]))
        
        # Save to database
        db = get_database()
        detection_result["created_at"] = datetime.utcnow()
        new_history = await db.history.insert_one(detection_result)
        
        # Return the saved history
        created_history = await db.history.find_one({"_id": new_history.inserted_id})
        return created_history
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Detection failed: {str(e)}"
        )