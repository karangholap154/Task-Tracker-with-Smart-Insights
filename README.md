# 📘 Task Tracker with Smart Insights

## 🧩 Project Overview

**Task Tracker with Smart Insights** is a full-stack web application that helps users manage their daily tasks efficiently while providing AI-powered summaries of their task performance. It allows users to create, update, and track tasks, with real-time insights generated based on the current task list.

---

## 🚀 Features

* ✅ Add, edit, and complete tasks
* ⚡ Real-time task listing with PostgreSQL
* 🧠 AI-powered smart insights (via OpenAI API)
* 🕹️ Simple and responsive UI built with React + Tailwind CSS
* 🔗 RESTful API backend with Node.js, Express.js, and PostgreSQL

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js + Express.js
* PostgreSQL (pg library)
* CORS
* dotenv for environment variables
* OpenAI API for insights

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/task-tracker-smart-insights.git
cd task-tracker-smart-insights
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=4000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=tasktracker
DB_PORT=5432
OPENAI_API_KEY=your_openai_api_key
```

Run the backend:

```bash
node index.js
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## 📂 Folder Structure

```
project-root/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│
└── README.md
```

---

## 🧠 API Endpoints

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | /tasks          | Get all tasks           |
| POST   | /tasks          | Add a new task          |
| PATCH  | /tasks/:id      | Update task status      |
| GET    | /tasks/insights | Get AI summary of tasks |

---

## 📊 Example Insight Output

> You have 4 tasks in total — 2 are completed and 2 are still pending. Most of your tasks are due within 3 days and have Medium priority.

---

## 📬 Contact

**Author:** Karan Gholap
**Email:** [karangholap154@gmail.com](mailto:karangholap154@gmail.com)
**GitHub:** [github.com/karangholap154](https://github.com/karangholap154)

---

⭐ *Thank you for reviewing this project! Developed with dedication and learning spirit.*
