# 🗒️ Notes.md — Design & Logic Explanation

## 🎯 Project Name

**Task Tracker with Smart Insights**

---

## 🧩 1. Database Design

### 🗃️ Table: `tasks`

| Column Name | Type                    | Description                                   |
| ----------- | ----------------------- | --------------------------------------------- |
| id          | SERIAL PRIMARY KEY      | Unique task identifier                        |
| title       | VARCHAR(255)            | Task title                                    |
| description | TEXT                    | Task description                              |
| priority    | VARCHAR(10)             | Priority level (Low, Medium, High)            |
| status      | VARCHAR(15)             | Task status (Pending, In Progress, Completed) |
| due_date    | DATE                    | Deadline for task completion                  |
| created_at  | TIMESTAMP DEFAULT NOW() | Record creation time                          |

📘 **Indexes:**

* Index on `priority` and `status` for faster filtering
* Index on `due_date` for sorting

---

## 🧠 2. Insight Generation Logic

The `/tasks/insights` endpoint summarizes task distribution using lightweight rule-based logic.

### Example Logic:

1. Count total tasks.
2. Group tasks by priority (Low, Medium, High).
3. Count tasks due within 3 days (using `due_date`).
4. Identify the most common priority and upcoming workload.

### Sample Insight Output:

> You have 12 tasks — 5 are High priority. 4 are due within the next 2 days. This week looks quite busy!

This insight is generated using **Node.js** logic, not AI models — it uses conditional checks and query results.

---

## ⚙️ 3. Backend Logic Overview

* Framework: **Express.js**
* Database Connection: **pg (PostgreSQL)**
* Environment Variables: **dotenv**
* Middleware: **CORS**, **express.json()**

### API Routes Summary

| Method | Endpoint        | Description                                    |
| ------ | --------------- | ---------------------------------------------- |
| POST   | /tasks          | Add a new task                                 |
| GET    | /tasks          | List all tasks with filters (status, priority) |
| PATCH  | /tasks/:id      | Update task’s status or priority               |
| GET    | /tasks/insights | Compute and return summary insights            |

---

## 💻 4. Frontend Logic Overview

* Framework: **React (Vite)**
* Styling: **Tailwind CSS**
* Data Fetching: **Axios**

### Key Components

* **AddTaskForm.jsx** → For creating new tasks
* **TaskList.jsx** → Displays all tasks, with filters
* **InsightsPanel.jsx** → Shows AI-style insight from backend

State is managed using **React hooks (useState, useEffect)**.

---

## 🧱 5. Improvements & Future Enhancements

1. 🔐 Add user authentication (JWT-based login)
2. 📈 Implement pagination and task timeline chart
3. 🧮 Add due-date reminders via email or notification
4. ☁️ Deploy backend on Render and frontend on Vercel

---

## 📅 Submission Details

* **Prepared by:** Karan Gholap
* **Date:** October 30, 2025
* **Course:** B.E. Computer Engineering
* **Purpose:** Full-stack mini project submission for assessment
