from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from app.schemas.user_schema import PyObjectId

class VideoDetail(BaseModel):
    original_name: str
    saved_name: str
    file_path: str
    size_mb: float
    format: str

class AIAnalysis(BaseModel):
    model_name: str
    prediction: str
    confidence_score: float
    faces_detected: int
    frames_analyzed: int

class ExecutionStats(BaseModel):
    start_time: datetime
    end_time: datetime
    processing_duration_sec: float

class HistoryBase(BaseModel):
    user_id: str
    video_detail: VideoDetail
    ai_analysis: AIAnalysis
    execution_stats: ExecutionStats

class HistoryCreate(HistoryBase):
    pass

class HistoryResponse(HistoryBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "from_attributes": True,
        "json_encoders": {ObjectId: str}
    }