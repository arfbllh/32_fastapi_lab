from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi# MongoDB connection


uri = "mongodb+srv://arifbillah:test@cluster0.4wp8rwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))


db = client.get_database('iplab')

collection = db.get_collection('users')


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

#save some data 
data = {'username': 'arfbllh', 'password': '123456', 'email': 'arfbllh@gmail.com', 'phone_number': '01712345678'}


collection.insert_one(data)
