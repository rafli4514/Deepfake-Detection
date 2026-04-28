from fastapi import FastAPI
from app.api import auth, history
from app.core.database import connect_to_mongo, close_mongo_connection
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Deepfake Detection System API",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deepfake Detection API", "docs": "/docs"}

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(history.router, prefix="/history", tags=["detection history"])
