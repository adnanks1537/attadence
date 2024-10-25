import pymongo
from pymongo import MongoClient

# MongoDB connection string
client = MongoClient("mongodb+srv://adnankstheredteamlabs:Adnan%4066202@cluster0.qrppz7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Access the database and collection
db = client['Cluster0']      # Replace with your database name if different
cadets_collection = db['cadets']  # Collection where cadet records will be stored

# Sample cadet data to insert into MongoDB
cadet_data = [
    {
        "cadetID": "C001",
        "name": "John Doe",
        "rank": "Sergeant",
        "year": 3,
        "attendance": []
    },
    {
        "cadetID": "C002",
        "name": "Jane Smith",
        "rank": "Corporal",
        "year": 2,
        "attendance": []
    },
    {
        "cadetID": "C003",
        "name": "Michael Brown",
        "rank": "Lieutenant",
        "year": 4,
        "attendance": []
    },
    {
        "cadetID": "C004",
        "name": "Emily Johnson",
        "rank": "Private",
        "year": 1,
        "attendance": []
    },
    {
        "cadetID": "C005",
        "name": "Daniel Garcia",
        "rank": "Sergeant",
        "year": 3,
        "attendance": []
    }
]

# Insert sample data into MongoDB
try:
    # Insert data if collection is empty to avoid duplication
    if cadets_collection.count_documents({}) == 0:
        cadets_collection.insert_many(cadet_data)
        print("Cadet data successfully inserted into MongoDB.")
    else:
        print("Cadet data already exists in the collection.")
except Exception as e:
    print("Error inserting data:", e)

# Fetch and display the data to confirm insertion
try:
    cadets = cadets_collection.find()
    print("\nCadets in MongoDB:")
    for cadet in cadets:
        print(cadet)
except Exception as e:
    print("Error retrieving data:", e)
