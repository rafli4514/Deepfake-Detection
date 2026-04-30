import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_history():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.deepfake_db
    last_history = await db.history.find_one(sort=[("_id", -1)])
    print(last_history)

if __name__ == "__main__":
    asyncio.run(check_history())
