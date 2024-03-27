from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


app = FastAPI()

# MongoDB connection
uri = "mongodb+srv://arifbillah:test@cluster0.4wp8rwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

collection = client.get_database('iplab').get_collection('users')
# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.post('/register')
async def register_user(userdata: dict):

    username = userdata['username']
    email = userdata['email']
    password = userdata['password']
    phone_number = userdata['phoneNumber']
    print(username, email, password, phone_number)


    if collection.find_one({'username': username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    

    if collection.find_one({'email': email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    if collection.find_one({'phone_number': phone_number}):
        raise HTTPException(status_code=400, detail="Phone number already exists")
    

    user_data = {'username': username, 'password': password, 'email': email, 'phone_number': phone_number}
    collection.insert_one(user_data)

    return {"message": "User registered successfully"}
