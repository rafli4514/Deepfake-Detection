from fastapi import HTTPException, status
from app.schemas.user_schema import UserCreate, ForgotPassword, ResetPassword, UpdatePassword, UpdateProfile
from app.core.security import verify_password, get_password_hash, create_access_token
from app.core.database import get_database
from datetime import datetime
from bson import ObjectId
from jose import jwt, JWTError
from app.core.config import settings

class AuthService:
    @staticmethod
    async def register_user(user_in: UserCreate):
        db = get_database()
        existing_user = await db.users.find_one({"email": user_in.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email sudah terdaftar")
        
        user_dict = user_in.dict()
        password = user_dict.pop("password")
        user_dict["password_hash"] = get_password_hash(password)
        user_dict["created_at"] = datetime.utcnow()
        
        new_user = await db.users.insert_one(user_dict)
        return await db.users.find_one({"_id": new_user.inserted_id})

    @staticmethod
    async def login_user(username: str, password: str):
        db = get_database()
        user = await db.users.find_one({"email": username})
        
        if not user or not verify_password(password, user["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email atau password salah",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token = create_access_token(subject=str(user["_id"]))
        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    async def forgot_password(email: str):
        db = get_database()
        user = await db.users.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        reset_token = create_access_token(email)
        reset_link = f"http://localhost:8000/auth/reset-password?token={reset_token}"
        
        # Simulasi kirim email
        print(f"\n[EMAIL] Link: {reset_link}\n")
        
        return {
            "message": "Link reset telah dikirim.",
            "reset_link": reset_link,
            "token": reset_token
        }

    @staticmethod
    async def reset_password(reset_data: ResetPassword):
        db = get_database()
        try:
            payload = jwt.decode(reset_data.token, settings.SECRET_KEY, algorithms=["HS256"])
            email: str = payload.get("sub")
            if email is None:
                raise HTTPException(status_code=401, detail="Invalid token")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")
            
        user = await db.users.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        hashed_password = get_password_hash(reset_data.new_password)
        await db.users.update_one({"_id": user["_id"]}, {"$set": {"password_hash": hashed_password}})
        return await db.users.find_one({"_id": user["_id"]})

    @staticmethod
    async def update_password(user_id: str, password_data: UpdatePassword):
        db = get_database()
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user or not verify_password(password_data.old_password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Password lama salah")
        
        hashed_password = get_password_hash(password_data.new_password)
        await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"password_hash": hashed_password}})
        return await db.users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    async def update_profile(user_id: str, profile_data: UpdateProfile):
        db = get_database()
        update_data = {k: v for k, v in profile_data.dict().items() if v is not None}
        await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        return await db.users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    async def delete_user(user_id: str):
        db = get_database()
        result = await db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        return True
