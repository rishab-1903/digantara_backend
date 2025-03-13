# digantara_backend
# API Logs Backend Service

## 📌 Overview
This project provides a backend service for executing algorithms, logging API calls, and retrieving analytics. The service is deployed on **Render** and utilizes a **PostgreSQL database** for storing logs. 

### **✨ Features**
- Implements three algorithms: **Binary Search, Quick Sort, BFS (Breadth-First Search)**.
- Stores logs of all API calls in a **PostgreSQL database**.
- Provides **API analytics** for insights on usage and performance.
- Fully deployed on **Render**, accessible via the hosted API link.
- **No local PostgreSQL setup required** if using the deployed version.

---
## 🚀 Working Locally & Deployment Guide

### **1️⃣ Running Locally**
Follow these steps to set up and run the project locally:

#### **Step 1: Clone the Repository**
```sh
git clone <your-repository-url>
cd <your-project-directory>
```

#### **Step 2: Install Dependencies**
```sh
npm install
```

#### **Step 3: Configure the Database**
- Replace the **PostgreSQL URL** with your **local database connection** in `logger.js` and `analytics.js`:
```javascript
const pool = new Pool({
    connectionString: "postgresql://postgres:yourpassword@localhost:5432/digantara_logs",
    ssl: false
});
```

#### **Step 4: Run the Server**
```sh
node src/app.js
```
By default, the service will run at **http://localhost:3000**

#### **Step 5: Test APIs via Postman or Curl**
Example request using `curl`:
```sh
curl -X POST "http://localhost:3000/api/binary-search" -H "Content-Type: application/json" -d '{"array": [10, 20, 30, 40, 50], "target": 30}'
```

---
### **2️⃣ Using the Deployed Render API**
The API is hosted on Render and accessible at:
🔗 **[Live API on Render] -> (https://digantara-backend.onrender.com/)**

#### **Step 1: Copy the API URL**
Use the **Render link** and append endpoints for API calls.
Example: 
```sh
curl -X GET "https://digantara-backend.onrender.com/api/logs-from-db"
```

#### **Step 2: Test API via Postman or Curl**
You can use the API without setting up PostgreSQL locally!

---
## 📡 API Endpoints & Usage

### **1️⃣ `/api/binary-search` (POST)**
🔹 **Finds the index of a target number in a sorted array**.

#### **Request Body (JSON):**
```json
{
    "array": [10, 20, 30, 40, 50],
    "target": 30
}
```

#### **Possible Responses:**
✅ **If the number is found:**
```json
{
    "index": 2
}
```
❌ **If the number is not found:**
```json
{
    "index": -1
}
```

---
### **2️⃣ `/api/quick-sort` (POST)**
🔹 **Sorts an array using Quick Sort**.

#### **Request Body (JSON):**
```json
{
    "array": [5, 3, 8, 1, 2]
}
```

#### **Response:**
```json
{
    "sortedArray": [1, 2, 3, 5, 8]
}
```

---
### **3️⃣ `/api/bfs` (POST)**
🔹 **Performs Breadth-First Search on a graph**.

#### **Request Body (JSON):**
```json
{
    "graph": {
        "A": ["B", "C"],
        "B": ["D", "E"],
        "C": ["F", "G"]
    },
    "startNode": "A"
}
```

#### **Response:**
```json
{
    "traversal": ["A", "B", "C", "D", "E", "F", "G"]
}
```

---
### **4️⃣ `/api/analytics` (GET)**
🔹 **Retrieves API usage statistics**.

#### **Response:**
```json
{
    "most_used_algorithm": { "algorithm_name": "quick-sort", "count": 10 },
    "average_execution_time": [
        { "algorithm_name": "quick-sort", "avg_execution_time": 2.5 },
        { "algorithm_name": "bfs", "avg_execution_time": 1.8 }
    ],
    "total_api_calls": 50
}
```

---
### **5️⃣ `/api/logs-from-db` (GET)**
🔹 **Fetches logs directly from the PostgreSQL database**.

#### **Response:**
```json
[
    {
        "id": 1,
        "algorithm_name": "binary-search",
        "input_data": { "array": [10, 20, 30, 40, 50], "target": 30 },
        "output_data": { "index": 2 },
        "timestamp": "2024-03-13T10:00:00Z"
    }
]
```
🔹 **No need to set up PostgreSQL locally** to view logs if using Render.

---
## 📂 Database Access (For Debugging)

To manually check logs in PostgreSQL:
```sh
psql -U <username> -d <database> -h <host> -p <port>
```
Run:
```sql
SELECT * FROM api_logs;
```

---
## 🔄 Deployment & Updating Code
### **Local Deployment**
1. Make changes in the code.
2. Commit and push to GitHub:
```sh
git add .
git commit -m "Updated API logic"
git push origin main
```

### **Render Deployment**
Render auto-deploys changes when pushed to GitHub. To manually trigger:
1. Go to **Render Dashboard** → Click on your service.
2. Click **Clear Cache & Redeploy**.

---
## 🤝 Contributing
Feel free to contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "New feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---
## 📜 License
This project is licensed under [MIT License](LICENSE).

---
🚀 **Now you are ready to use the API!** Let me know if you need any improvements. 😊

