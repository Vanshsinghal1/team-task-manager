import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const createTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks/create",
        { title, description },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  
  const markCompleted = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/update/${id}`,
        { status: "completed" },
        { headers: { Authorization: token } }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🚀 Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      
      <div className="bg-gray-800 p-4 rounded mb-6 shadow-lg">
        <h2 className="text-lg mb-3 font-semibold">➕ Create Task</h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 rounded outline-none"
        />

        <input
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 rounded outline-none"
        />

        <button
          onClick={createTask}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

     
      <div className="flex gap-4 mb-6">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{task.title}</h2>

            <p className="text-gray-400 mt-2">
              {task.description}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={`${
                  task.status === "completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {task.status}
              </span>
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => markCompleted(task._id)}
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                ✔ Done
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;