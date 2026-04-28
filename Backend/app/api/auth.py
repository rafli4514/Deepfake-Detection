from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.schemas.user_schema import UserCreate, UserResponse
from app.schemas.token_schema import Token, TokenData
from app.core.database import get_database
from app.core.security import verify_password, get_password_hash, create_access_token, ALGORITHM
from app.core.config import settings
from datetime import datetime
from bson import ObjectId
from jose import jwt, JWTError

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
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    
    db = get_database()
    user = await db.users.find_one({"_id": ObjectId(token_data.user_id)})
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=UserResponse)
async def register_user(user_in: UserCreate):
    db = get_database()
    
    # Cek pengguna jika ada
    existing_user = await db.users.find_one({"email": user_in.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    
    user_dict = user_in.dict()
    password = user_dict.pop("password")
    
    # Hashing password
    user_dict["password_hash"] = get_password_hash(password)
    user_dict["created_at"] = datetime.utcnow()
    
    new_user = await db.users.insert_one(user_dict)
    created_user = await db.users.find_one({"_id": new_user.inserted_id})
    return created_user

@router.post("/login", response_model=Token)
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = get_database()
    user = await db.users.find_one({"email": form_data.username}) # Using email as username
    
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=str(user["_id"]))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def read_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.get("/users/", response_model=list[UserResponse])
async def get_all_users():
    db = get_database()
    return await db.users.find().to_list(length=None)

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    db = get_database()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/delete/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(current_user: dict = Depends(get_current_user)):
    db = get_database()
    delete_result = await db.users.delete_one({"_id": ObjectId(current_user["_id"])})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return None

@router.delete("/delete/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str):
    db = get_database()
    delete_result = await db.users.delete_one({"_id": ObjectId(user_id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return None