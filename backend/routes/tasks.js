import express from "express";
import { pool } from "../db.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { title, description, priority, due_date, status } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, due_date, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, priority || "Medium", due_date, status || "Pending"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding task" });
  }
});


router.get("/", async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    let query = "SELECT * FROM tasks";
    const conditions = [];
    const values = [];

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }
    if (priority) {
      values.push(priority);
      conditions.push(`priority = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    if (sort === "due_date") {
      query += " ORDER BY due_date ASC";
    } else {
      query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    if (!status && !priority)
      return res.status(400).json({ error: "Nothing to update" });

    let updates = [];
    let values = [];
    let index = 1;

    if (status) {
      updates.push(`status = $${index++}`);
      values.push(status);
    }
    if (priority) {
      updates.push(`priority = $${index++}`);
      values.push(priority);
    }

    values.push(id);

    const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = $${
      values.length
    } RETURNING *`;

    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating task" });
  }
});


router.get("/insights", async (req, res) => {
  try {
    const totalTasks = await pool.query("SELECT COUNT(*) FROM tasks");
    const byPriority = await pool.query(
      "SELECT priority, COUNT(*) FROM tasks GROUP BY priority"
    );
    const dueSoon = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE due_date <= CURRENT_DATE + INTERVAL '3 days' AND status != 'Completed'"
    );


    const highPriority = byPriority.rows.find((r) => r.priority === "High");
    const summary = `You have ${totalTasks.rows[0].count} tasks. ${
      highPriority
        ? `Most are ${highPriority.priority} priority.`
        : "Keep it up!"
    } ${dueSoon.rows[0].count} task(s) are due soon.`;

    res.json({
      totalTasks: totalTasks.rows[0].count,
      byPriority: byPriority.rows,
      dueSoon: dueSoon.rows[0].count,
      summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating insights" });
  }
});

export default router;
