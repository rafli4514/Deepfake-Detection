import os
import uuid
import random
import asyncio
from datetime import datetime
from fastapi import UploadFile
from app.core.config import settings
from app.schemas.history_schema import VideoDetail, AIAnalysis, ExecutionStats

async def detect_deepfake(file: UploadFile, user_id: str) -> dict:
    start_time = datetime.utcnow()
    
    # 1. Ensure upload directory exists
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    # 2. Save the file
    file_ext = os.path.splitext(file.filename)[1]
    saved_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, saved_filename)
    
    content = await file.read()
    file_size = len(content)
    
    with open(file_path, "wb") as f:
        f.write(content)
        
    # 3. Simulate AI Processing time (2-5 seconds)
    processing_time = random.uniform(2.0, 5.0)
    await asyncio.sleep(processing_time)
    
    # 4. Generate Mock Results
    confidence_score = random.uniform(0.1, 0.99)
    prediction = "FAKE" if confidence_score > 0.5 else "REAL"
    
    end_time = datetime.utcnow()
    duration = (end_time - start_time).total_seconds()
    
    # 5. Prepare schema-ready data
    video_detail = {
        "original_name": file.filename,
        "saved_name": saved_filename,
        "file_path": file_path,
        "size_mb": round(file_size / (1024 * 1024), 2),
        "format": file_ext.replace(".", "").upper()
    }
    
    ai_analysis = {
        "model_name": "EfficientNet-B4-Deepfake (Mock)",
        "prediction": prediction,
        "confidence_score": round(confidence_score, 4),
        "faces_detected": random.randint(1, 5),
        "frames_analyzed": random.randint(30, 100)
    }
    
    execution_stats = {
        "start_time": start_time,
        "end_time": end_time,
        "processing_duration_sec": round(duration, 2)
    }
    
    return {
        "user_id": user_id,
        "video_detail": video_detail,
        "ai_analysis": ai_analysis,
        "execution_stats": execution_stats
    }
