import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle2,
  Circle,
  Plus,
  TrendingUp,
  Clock,
  AlertCircle,
  X,
  Trash2,
  Filter,
  Layout,
} from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
  });
  const [insights, setInsights] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API = "https://task-tracker-with-smart-insights.onrender.com";

  const getTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getInsights = async () => {
    try {
      const res = await axios.get(`${API}/tasks/insights`);
      setInsights(res.data);
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    }
  };

  useEffect(() => {
    getTasks();
    getInsights();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/tasks`, form);
      setForm({ title: "", description: "", priority: "Medium", due_date: "" });
      setIsFormOpen(false);
      getTasks();
      getInsights();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const updateTask = async (id, newStatus) => {
    try {
      await axios.patch(`${API}/tasks/${id}`, { status: newStatus });
      getTasks();
      getInsights();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      getTasks();
      getInsights();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "from-red-500 to-rose-600";
      case "Medium":
        return "from-amber-500 to-orange-600";
      case "Low":
        return "from-emerald-500 to-teal-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Low":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/40";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return task.status !== "Completed";
    if (filter === "completed") return task.status === "Completed";
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status !== "Completed").length,
  };

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative">
        <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-2 sm:p-2.5 rounded-2xl">
                    <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                  <p className="text-xs text-purple-400 hidden sm:block">
                    Productivity reimagined
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg text-sm sm:text-base">
                  {isFormOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {isFormOpen ? "Close" : "New Task"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div
              className={`lg:col-span-4 order-2 lg:order-1 ${
                isFormOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="lg:sticky lg:top-24">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-5 sm:mb-6">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-lg">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        Create Task
                      </h2>
                    </div>

                    <form onSubmit={addTask} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="What needs to be done?"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-sm"
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
                          Description
                        </label>
                        <textarea
                          placeholder="Add more details..."
                          rows="3"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none resize-none text-sm"
                          value={form.description}
                          onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
                            Priority
                          </label>
                          <select
                            className="w-full px-3 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-sm"
                            value={form.priority}
                            onChange={(e) =>
                              setForm({ ...form, priority: e.target.value })
                            }
                          >
                            <option className="bg-slate-900">Low</option>
                            <option className="bg-slate-900">Medium</option>
                            <option className="bg-slate-900">High</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
                            Due Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none text-sm"
                            value={form.due_date}
                            onChange={(e) =>
                              setForm({ ...form, due_date: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="relative w-full group mt-6"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur group-hover:blur-md transition-all opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-sm">
                          <Plus className="w-5 h-5" />
                          Add Task
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 order-1 lg:order-2 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-purple-500/20 p-2.5 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                        Total
                      </span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stats.total}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-300">
                      All Tasks
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-emerald-500/30 hover:border-emerald-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                        {completionRate}%
                      </span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stats.completed}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-300">
                      Completed
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-amber-500/30 hover:border-amber-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-amber-500/20 p-2.5 rounded-xl">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stats.pending}
                    </p>
                    <p className="text-xs sm:text-sm text-amber-300">
                      In Progress
                    </p>
                  </div>
                </div>
              </div>

              {insights && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-blue-300 mb-1">
                          AI Insight
                        </p>
                        <p className="text-xs text-blue-200 leading-relaxed">
                          {insights.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="w-4 h-4 text-purple-400 flex-shrink-0" />
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 sm:px-5 py-2 rounded-xl font-medium transition-all text-sm whitespace-nowrap ${
                      filter === f
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-slate-800/50 text-purple-300 hover:bg-slate-800/70 border border-white/10"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-700/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-12 sm:p-16 text-center border border-white/10">
                      <div className="bg-slate-800/50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <Circle className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        No tasks found
                      </h3>
                      <p className="text-sm text-purple-300">
                        {filter === "all"
                          ? "Create your first task to get started!"
                          : `No ${filter} tasks yet.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  filteredTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="relative group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeSlideIn 0.4s ease-out forwards",
                        opacity: 0,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-purple-500/30 transition-all">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <button
                            onClick={() =>
                              updateTask(
                                task.id,
                                task.status === "Completed"
                                  ? "Pending"
                                  : "Completed"
                              )
                            }
                            className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform"
                          >
                            {task.status === "Completed" ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-purple-400 hover:text-purple-300" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <h3
                                className={`text-base sm:text-lg font-semibold break-words ${
                                  task.status === "Completed"
                                    ? "text-slate-500 line-through"
                                    : "text-white"
                                }`}
                              >
                                {task.title}
                              </h3>
                              <span
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex-shrink-0 ${getPriorityBadge(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            {task.description && (
                              <p
                                className={`text-xs sm:text-sm mb-3 break-words leading-relaxed ${
                                  task.status === "Completed"
                                    ? "text-slate-500"
                                    : "text-slate-400"
                                }`}
                              >
                                {task.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 text-xs">
                              {task.due_date && (
                                <div className="flex items-center gap-1.5 text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>
                                    {new Date(
                                      task.due_date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              <div
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                  task.status === "Completed"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                }`}
                              >
                                {task.status}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="flex-shrink-0 p-2 hover:bg-red-500/20 rounded-lg transition-all opacity-60 hover:opacity-100 border border-transparent hover:border-red-500/30"
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>

                        <div className="mt-4 h-1.5 rounded-full bg-slate-800/50 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${getPriorityColor(
                              task.priority
                            )} ${
                              task.status === "Completed" ? "w-full" : "w-1/3"
                            } transition-all duration-700 shadow-lg`}
                            style={{
                              boxShadow:
                                task.status === "Completed"
                                  ? "0 0 10px currentColor"
                                  : "none",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(168, 85, 247), rgb(236, 72, 153));
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(147, 51, 234), rgb(219, 39, 119));
        }
      `}</style>
    </div>
  );
}

export default App;
