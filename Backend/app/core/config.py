import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Deepfake Detection API"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB Config
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "deepfake_db")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    # Deepfake Detection
    # DETECTION_MODEL_PATH: str = os.getenv("DETECTION_MODEL_PATH", "models/deepfake_detector.pt")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "storage/uploads")

settings = Settings()
