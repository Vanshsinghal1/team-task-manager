import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

const STATUS_COLORS = {
  pending: { bg: "rgba(234,179,8,0.12)", color: "#fbbf24", border: "rgba(234,179,8,0.3)" },
  completed: { bg: "rgba(34,197,94,0.12)", color: "#4ade80", border: "rgba(34,197,94,0.3)" },
  "in-progress": { bg: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "rgba(99,102,241,0.3)" },
};

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

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
    if (!title || !description || !assignedTo) return alert("Fill all fields");
    setLoading(true);
    await axios.post(`${API}/api/tasks/create`, { title, description, assignedTo });
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setLoading(false);
    fetchTasks();
    setActiveTab("tasks");
  };

  const stats = [
    { label: "Total Tasks", value: tasks.length, icon: "📋", color: "#4ade80" },
    { label: "Completed", value: tasks.filter((t) => t.status === "completed").length, icon: "✅", color: "#22d3ee" },
    { label: "Pending", value: tasks.filter((t) => t.status !== "completed").length, icon: "⏳", color: "#fbbf24" },
    { label: "Users", value: users.length, icon: "👥", color: "#a5b4fc" },
  ];

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logoIcon}>🌿</span>
          <div>
            <div style={styles.logoText}>TaskFlow</div>
            <div style={styles.headerSub}>Admin Control Panel</div>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.adminBadge}>
            <span>👑</span>
            <span>Administrator</span>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {/* STATS ROW */}
        <div style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ ...styles.statIconBox, background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                <span style={{ fontSize: "20px" }}>{s.icon}</span>
              </div>
              <div>
                <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={styles.tabRow}>
          {[
            { id: "create", label: "➕ Create Task" },
            { id: "tasks", label: `📋 All Tasks (${tasks.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabBtn,
                background: activeTab === tab.id ? "rgba(74,222,128,0.12)" : "transparent",
                color: activeTab === tab.id ? "#4ade80" : "#64748b",
                borderColor: activeTab === tab.id ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.06)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CREATE TASK PANEL */}
        {activeTab === "create" && (
          <div style={styles.createPanel}>
            <h2 style={styles.panelTitle}>Create & Assign Task</h2>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Task Title</label>
                <input
                  placeholder="E.g. Design new landing page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Assign To</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  style={styles.input}
                >
                  <option value="">Select a user</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Describe the task in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{ ...styles.input, resize: "vertical" }}
              />
            </div>
            <button
              onClick={createTask}
              disabled={loading}
              style={{ ...styles.assignBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Assigning..." : "Assign Task →"}
            </button>
          </div>
        )}

        {/* TASKS GRID */}
        {activeTab === "tasks" && (
          <div>
            {tasks.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <p>No tasks yet. Create your first task!</p>
                <button onClick={() => setActiveTab("create")} style={styles.emptyBtn}>
                  Create Task
                </button>
              </div>
            ) : (
              <div style={styles.tasksGrid}>
                {tasks.map((task) => {
                  const sc = STATUS_COLORS[task.status] || STATUS_COLORS.pending;
                  return (
                    <div key={task._id} style={styles.taskCard}>
                      <div style={styles.taskCardHeader}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            background: sc.bg,
                            color: sc.color,
                            border: `1px solid ${sc.border}`,
                          }}
                        >
                          {task.status || "pending"}
                        </span>
                      </div>
                      <h3 style={styles.taskTitle}>{task.title}</h3>
                      <p style={styles.taskDesc}>{task.description}</p>
                      <div style={styles.taskMeta}>
                        <span style={styles.metaTag}>👤 {task.assignedTo?.name || "Unknown"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#060d05",
    color: "#e8f5e2",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)",
    top: "-150px",
    right: "-100px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
    bottom: "-80px",
    left: "-80px",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(6,13,5,0.8)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  logoIcon: { fontSize: "28px" },
  logoText: { fontSize: "18px", fontWeight: "800", color: "#86efac", letterSpacing: "-0.5px" },
  headerSub: { fontSize: "11px", color: "#334155", fontWeight: "500", marginTop: "1px" },
  headerRight: {},
  adminBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    padding: "6px 14px",
    color: "#fca5a5",
    fontSize: "13px",
    fontWeight: "600",
  },
  main: { padding: "32px 40px", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backdropFilter: "blur(8px)",
  },
  statIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statValue: { fontSize: "28px", fontWeight: "900", letterSpacing: "-1px" },
  statLabel: { fontSize: "12px", color: "#4b6358", fontWeight: "500", marginTop: "2px" },
  tabRow: { display: "flex", gap: "8px", marginBottom: "24px" },
  tabBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  createPanel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "32px",
  },
  panelTitle: { fontSize: "20px", fontWeight: "800", color: "#f0fdf4", margin: "0 0 24px", letterSpacing: "-0.5px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  inputGroup: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#4b6358",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "7px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  assignBtn: {
    padding: "13px 32px",
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    border: "none",
    borderRadius: "12px",
    color: "#000",
    fontSize: "14px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "8px",
  },
  tasksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  taskCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "20px",
    transition: "border-color 0.2s",
  },
  taskCardHeader: { marginBottom: "12px" },
  statusBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "100px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  taskTitle: { fontSize: "15px", fontWeight: "700", color: "#f0fdf4", margin: "0 0 8px", letterSpacing: "-0.3px" },
  taskDesc: { fontSize: "13px", color: "#4b6358", margin: "0 0 14px", lineHeight: "1.6" },
  taskMeta: { display: "flex", gap: "8px" },
  metaTag: {
    fontSize: "12px",
    color: "#86efac",
    background: "rgba(74,222,128,0.08)",
    border: "1px solid rgba(74,222,128,0.15)",
    borderRadius: "8px",
    padding: "4px 10px",
  },
  emptyState: { textAlign: "center", padding: "80px 20px", color: "#4b6358" },
  emptyIcon: { fontSize: "48px", marginBottom: "16px" },
  emptyBtn: {
    marginTop: "16px",
    padding: "10px 24px",
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.3)",
    borderRadius: "10px",
    color: "#4ade80",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};