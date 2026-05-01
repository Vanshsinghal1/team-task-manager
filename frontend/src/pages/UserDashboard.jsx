import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    const res = await axios.get(
      `${API}/api/tasks/mytasks/${userId}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markDone = async (id) => {
    await axios.put(
      `${API}/api/tasks/update/${id}`,
      { status: "completed" }
    );
    fetchTasks();
  };

  return (
    <div className="p-6 text-white bg-gradient-to-br from-black to-gray-900 min-h-screen">

      <h1 className="text-3xl mb-6 font-bold">👨‍💻 My Tasks</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-gray-800 p-4 rounded shadow">

            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <p>
              Status:{" "}
              <span className={
                task.status === "completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }>
                {task.status}
              </span>
            </p>

            {task.status !== "completed" && (
              <button
                onClick={() => markDone(task._id)}
                className="bg-green-500 px-3 py-1 mt-3 rounded"
              >
                ✔ Mark Done
              </button>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}