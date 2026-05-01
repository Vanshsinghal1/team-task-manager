import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks`);
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const createTask = async () => {
    if (!title || !description || !assignedTo) {
      return alert("Fill all fields");
    }

    await axios.post(`${API}/api/tasks/create`, {
      title,
      description,
      assignedTo
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");

    fetchTasks();
  };

  return (
    <div className="p-6 text-white bg-gradient-to-br from-black to-gray-900 min-h-screen">

      <h1 className="text-3xl mb-6 font-bold">👑 Admin Dashboard</h1>

      <div className="bg-gray-800 p-5 rounded mb-6 shadow-lg">
        <h2 className="mb-3 text-lg font-semibold">➕ Create & Assign Task</h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 rounded"
        />

        <input
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 rounded"
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="block w-full p-2 mb-3 bg-gray-700 rounded"
        >
          <option value="">Select User</option>

          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <button
          onClick={createTask}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Task
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-gray-800 p-4 rounded shadow">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Assigned to: {task.assignedTo?.name}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>

    </div>
  );
}