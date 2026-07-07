# Week 4 and 5: Full Backend

## Week 4: Introduction to Backend.

This mini project features a clean architectural structure, MongoDB integration via Mongoose, custom API response/error handling, and simple data modeling for a student management system.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Environment Management:** dotenv

## 📁 Folder Structure
The project follows a clean, modular architecture to ensure scalability and separation of concerns:

```text
src/
├── db/             # Database connection logic
├── models/         # Mongoose schema (Student model)
├── utils/          # Utility classes for custom API responses and errors
├── app.js          # Express app configuration and HTTP endpoints
└── index.js        # Main entry point and server initialization
```

## ✨ Key Features
* **Structured Database Connection:** Secure MongoDB connection using environment variables, complete with error handling and success logging (`MongoDB connected successfully`).
* **Data Modeling:** A comprehensive `Student` schema featuring validation and timestamps for tracking `Name`, `Roll Number`, `Branch`, `Semester`, and `Email`.
* **Standardized API Responses:** Utilizes custom `ApiResponse` and `ApiError` utility classes to ensure every endpoint returns a consistent, predictable JSON structure.

---

## 🛠️ Local Setup & Installation

Follow these steps to get the server running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* A MongoDB database (either a local MongoDB Community Server or a MongoDB Atlas cloud cluster)

### 2. Install Dependencies
Clone your repository (if applicable) and install the required Node packages:
```bash
# Navigate to the project directory
cd your-project-folder

# Install dependencies (Express, Mongoose, dotenv)
npm install
```

### 3. Environment Variables
Create a file named `.env` in the root directory of your project. Add your MongoDB connection string and preferred port. 

**DO NOT commit this file to GitHub.** (Ensure `.env` is in your `.gitignore`).

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_db?retryWrites=true&w=majority
```
*(Note: Replace the `MONGO_URI` with your actual Atlas string or `mongodb://127.0.0.1:27017/student_db` if running locally).*

### 4. Start the Server
Run the application using Node:
```bash
node src/index.js
```
If everything is configured correctly, your terminal should output:
```text
Server is running on port 8000
MongoDB connected successfully
```

---

## 📡 API Documentation

### 1. Health Check
Verifies that the backend is active and listening for requests.

* **URL:** `/health`
* **Method:** `GET`
* **Success Response:**
  * **Content:**
    ```json
    {
      "message": "Backend running successfully"
    }
    ```

### 2. Create Student
Accepts student data and provisions a new document in the database.

* **URL:** `/student`
* **Method:** `POST`
* **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "rollNumber": "101234",
    "branch": "Computer Science",
    "semester": 3,
    "email": "john.doe@example.com"
  }
  ```
* **Success Response:**
  * **Content:**
    ```json
    {
      "message": "Student created successfully"
    }
    ```

![Project Screenshot](src/assets/ss1.png)
![Project Screenshot](src/assets/ss2.png)
![Project Screenshot](src/assets/ss3.png)
![Project Screenshot](src/assets/ss4.png)

## Week 5: Progressing further in backend


    