from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import mimetypes

mimetypes.init()
mimetypes.add_type('video/mp4', '.mp4')
from app.api import auth, history, detection
from app.core.database import connect_to_mongo, close_mongo_connection
from app.core.config import settings
from app.services.model_service import model_service

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Deepfake Detection System API",
    version="1.0.0"
)

# Konfigurasi CORS (Cross-Origin Resource Sharing)
# Mengizinkan frontend (misal React/Vite di localhost:5173) untuk mengakses API backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Dalam produksi, ganti dengan domain frontend yang spesifik
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (video and images)
storage_abs_path = os.path.abspath("storage")
app.mount("/storage", CORSMiddleware(
    StaticFiles(directory=storage_abs_path),
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
), name="storage")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    model_service.load_model()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deepfake Detection API", "docs": "/docs"}

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["authentication"])
app.include_router(history.router, prefix=f"{settings.API_V1_STR}/history", tags=["detection history"])
app.include_router(detection.router, prefix=f"{settings.API_V1_STR}/detection", tags=["deepfake detection"])
