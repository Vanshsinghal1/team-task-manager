import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users"); 
      console.log("USERS:", res.data); 
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  
  const createTask = async () => {
    if (!title || !description || !assignedTo) {
      return alert("Fill all fields");
    }

    try {
      await axios.post("http://localhost:5000/api/tasks/create", {
        title,
        description,
        assignedTo
      });

      setTitle("");
      setDescription("");
      setAssignedTo("");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
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

          {users.length === 0 ? (
            <option disabled>Loading users...</option>
          ) : (
            users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))
          )}
        </select>

        <button
          onClick={createTask}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Task
        </button>
      </div>

      {/* 🔥 TASK LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-gray-800 p-4 rounded shadow">

            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-400">{task.description}</p>

            <p className="mt-2">
              Assigned to:{" "}
              <span className="text-blue-400">
                {task.assignedTo?.name}
              </span>
            </p>

            <p>
              Status:{" "}
              <span
                className={
                  task.status === "completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {task.status}
              </span>
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}