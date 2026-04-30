from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.history_schema import HistoryResponse
from app.core.database import get_database
from app.api.auth import get_current_user
from typing import List
from bson import ObjectId
from datetime import datetime

router = APIRouter()

# @router.post("/", response_model=HistoryResponse)
# async def create_history(history_in: HistoryCreate):
#     db = get_database()
#     history_dict = history_in.dict()
#     history_dict["created_at"] = datetime.now()
#     
#     new_history = await db.history.insert_one(history_dict)
#     created_history = await db.history.find_one({"_id": new_history.inserted_id})
#     return created_history

@router.get("/", response_model=List[HistoryResponse])
async def list_history(
    skip: int = 0, 
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    cursor = db.history.find({"user_id": str(current_user["_id"])}).skip(skip).limit(limit)
    return await cursor.to_list(length=limit)

@router.get("/{history_id}", response_model=HistoryResponse)
async def get_history(
    history_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    history = await db.history.find_one({
        "_id": ObjectId(history_id),
        "user_id": str(current_user["_id"])
    })
    if not history:
        raise HTTPException(status_code=404, detail="History not found")
    return history

@router.delete("/{history_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_history(
    history_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    delete_result = await db.history.delete_one({
        "_id": ObjectId(history_id),
        "user_id": str(current_user["_id"])
    })
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="History not found")
    return None
