from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.schemas.user_schema import UserCreate, UserResponse, ForgotPassword, ResetPassword, UpdatePassword, UpdateProfile
from app.schemas.token_schema import Token, TokenData
from app.core.database import get_database
from app.core.security import ALGORITHM
from app.core.config import settings
from app.services.auth_service import AuthService
from bson import ObjectId
from jose import jwt, JWTError
from typing import List

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    db = get_database()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate):
    return await AuthService.register_user(user_in)

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await AuthService.login_user(form_data.username, form_data.password)

@router.post("/forgot-password")
async def forgot_password(user_in: ForgotPassword):
    return await AuthService.forgot_password(user_in.email)

@router.post("/reset-password")
async def reset_password(reset_data: ResetPassword):
    return await AuthService.reset_password(reset_data)

@router.get("/me", response_model=UserResponse)
async def read_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.patch("/update-password", response_model=UserResponse)
async def update_password(password_data: UpdatePassword, current_user: dict = Depends(get_current_user)):
    return await AuthService.update_password(str(current_user["_id"]), password_data)

@router.patch("/update-profile", response_model=UserResponse)
async def update_profile(profile_data: UpdateProfile, current_user: dict = Depends(get_current_user)):
    return await AuthService.update_profile(str(current_user["_id"]), profile_data)

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(current_user: dict = Depends(get_current_user)):
    await AuthService.delete_user(str(current_user["_id"]))
    return None

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(limit: int = 10, skip: int = 0, current_user: dict = Depends(get_current_user)):
    db = get_database()
    return await db.users.find().skip(skip).limit(limit).to_list(length=limit)

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
