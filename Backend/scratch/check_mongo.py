import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_mongo():
    try:
        client = AsyncIOMotorClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
        await client.admin.command('ping')
        print("MongoDB is running!")
    except Exception as e:
        print(f"MongoDB is NOT running: {e}")

if __name__ == "__main__":
    asyncio.run(check_mongo())
