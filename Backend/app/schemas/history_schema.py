from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from bson import ObjectId
from app.schemas.user_schema import PyObjectId

class AnalysisStatus(str, Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class VideoDetail(BaseModel):
    original_name: str = Field(..., description="Original filename uploaded by the user")
    saved_name: str = Field(..., description="Unique filename stored on the server")
    file_path: str = Field(..., description="Absolute path to the video file")
    size_mb: float = Field(..., description="File size in Megabytes")
    format: str = Field(..., description="Video format (e.g., MP4, AVI)")
    resolution: Optional[str] = Field(None, description="Video resolution (e.g., 1920x1080)")
    duration_sec: Optional[float] = Field(None, description="Video duration in seconds")

class AIAnalysis(BaseModel):
    model_name: str = Field(..., description="Name of the AI model used for analysis")
    prediction: Optional[str] = Field(None, description="Final prediction (REAL or FAKE)")
    confidence_score: Optional[float] = Field(None, description="Confidence level of the prediction (0.0 to 1.0)")
    faces_detected: int = Field(0, description="Number of unique faces detected in the video")
    frames_analyzed: int = Field(0, description="Total number of frames processed by the model")

class ExecutionStats(BaseModel):
    start_time: datetime = Field(..., description="Timestamp when analysis started")
    end_time: Optional[datetime] = Field(None, description="Timestamp when analysis finished")
    processing_duration_sec: Optional[float] = Field(None, description="Total processing time in seconds")

class HistoryBase(BaseModel):
    user_id: str = Field(..., description="ID of the user who initiated the detection")
    status: AnalysisStatus = Field(default=AnalysisStatus.PENDING, description="Current status of the analysis")
    video_detail: VideoDetail
    ai_analysis: AIAnalysis
    execution_stats: ExecutionStats

class HistoryCreate(HistoryBase):
    pass

class HistoryResponse(HistoryBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.now, description="Timestamp when the record was created")

    model_config = {
        "populate_by_name": True,
        "from_attributes": True,
        "json_encoders": {ObjectId: str}
    }