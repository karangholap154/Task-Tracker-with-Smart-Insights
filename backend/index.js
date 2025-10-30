import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import tasksRouter from "./routes/tasks.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Task Tracker API is running 🚀");
});


app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected ✅", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed ❌" });
  }
});


app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
