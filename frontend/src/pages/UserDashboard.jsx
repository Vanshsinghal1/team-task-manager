import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

const STATUS_CONFIG = {
  pending: { bg: "rgba(234,179,8,0.12)", color: "#fbbf24", border: "rgba(234,179,8,0.3)", label: "Pending" },
  completed: { bg: "rgba(34,197,94,0.12)", color: "#4ade80", border: "rgba(34,197,94,0.3)", label: "Completed" },
  "in-progress": { bg: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "rgba(99,102,241,0.3)", label: "In Progress" },
};

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/api/tasks/mytasks/${userId}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markDone = async (id) => {
    await axios.put(`${API}/api/tasks/update/${id}`, { status: "completed" });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "pending") return t.status !== "completed";
    if (filter === "done") return t.status === "completed";
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status !== "completed").length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />

      
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span>🌿</span>
          <div>
            <div style={styles.logoText}>TaskFlow</div>
            <div style={styles.headerSub}>My Workspace</div>
          </div>
        </div>
        <div style={styles.userBadge}>
          <span>👨‍💻</span>
          <span>My Dashboard</span>
        </div>
      </header>

      <div style={styles.main}>
       
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeLeft}>
            <h2 style={styles.welcomeTitle}>
              Good work, <span style={styles.welcomeAccent}>keep it up! 🚀</span>
            </h2>
            <p style={styles.welcomeSub}>
              {pendingCount > 0
                ? `You have ${pendingCount} task${pendingCount > 1 ? "s" : ""} to complete today.`
                : "All tasks completed! Amazing work."}
            </p>
          </div>
          <div style={styles.progressCircle}>
            <svg viewBox="0 0 80 80" style={{ width: "80px", height: "80px", transform: "rotate(-90deg)" }}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="32" fill="none"
                stroke="#4ade80" strokeWidth="8"
                strokeDasharray={`${progress * 2.01} 201`}
                strokeLinecap="round"
              />
            </svg>
            <div style={styles.progressText}>{progress}%</div>
          </div>
        </div>

       
        <div style={styles.statsRow}>
          {[
            { label: "Total Tasks", value: tasks.length, color: "#4ade80", icon: "📋" },
            { label: "Completed", value: completedCount, color: "#22d3ee", icon: "✅" },
            { label: "Pending", value: pendingCount, color: "#fbbf24", icon: "⏳" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <span style={{ fontSize: "22px" }}>{s.icon}</span>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        
        <div style={styles.filterRow}>
          <h3 style={styles.sectionTitle}>My Tasks</h3>
          <div style={styles.filterBtns}>
            {[
              { id: "all", label: `All (${tasks.length})` },
              { id: "pending", label: `Pending (${pendingCount})` },
              { id: "done", label: `Done (${completedCount})` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  ...styles.filterBtn,
                  background: filter === f.id ? "rgba(74,222,128,0.12)" : "transparent",
                  color: filter === f.id ? "#4ade80" : "#4b6358",
                  borderColor: filter === f.id ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.06)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* TASKS */}
        {filteredTasks.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "48px" }}>🎉</div>
            <p style={{ color: "#4b6358", marginTop: "12px" }}>
              {filter === "done" ? "No completed tasks yet." : "No tasks here!"}
            </p>
          </div>
        ) : (
          <div style={styles.tasksGrid}>
            {filteredTasks.map((task) => {
              const sc = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
              const isDone = task.status === "completed";
              return (
                <div key={task._id} style={{ ...styles.taskCard, opacity: isDone ? 0.7 : 1 }}>
                  <div style={styles.taskTop}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background: sc.bg,
                        color: sc.color,
                        border: `1px solid ${sc.border}`,
                      }}
                    >
                      {sc.label}
                    </span>
                    {!isDone && (
                      <button
                        onClick={() => markDone(task._id)}
                        style={styles.doneBtn}
                      >
                        ✔ Mark Done
                      </button>
                    )}
                  </div>
                  <h3 style={{ ...styles.taskTitle, textDecoration: isDone ? "line-through" : "none" }}>
                    {task.title}
                  </h3>
                  <p style={styles.taskDesc}>{task.description}</p>
                  {isDone && (
                    <div style={styles.completedBanner}>
                      <span>🎯 Completed</span>
                    </div>
                  )}
                </div>
              );
            })}
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
    background: "radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)",
    top: "-100px",
    left: "-100px",
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
  logoText: { fontSize: "18px", fontWeight: "800", color: "#86efac" },
  headerSub: { fontSize: "11px", color: "#334155", fontWeight: "500" },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "10px",
    padding: "6px 14px",
    color: "#a5b4fc",
    fontSize: "13px",
    fontWeight: "600",
  },
  main: { padding: "32px 40px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 },
  welcomeCard: {
    background: "linear-gradient(135deg, rgba(22,163,74,0.1), rgba(34,211,238,0.05))",
    border: "1px solid rgba(74,222,128,0.15)",
    borderRadius: "20px",
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  welcomeLeft: {},
  welcomeTitle: { fontSize: "22px", fontWeight: "800", color: "#f0fdf4", margin: "0 0 6px", letterSpacing: "-0.5px" },
  welcomeAccent: {
    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  welcomeSub: { fontSize: "14px", color: "#4b6358", margin: 0 },
  progressCircle: { position: "relative", flexShrink: 0 },
  progressText: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "900",
    color: "#4ade80",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  statValue: { fontSize: "32px", fontWeight: "900", letterSpacing: "-1px" },
  statLabel: { fontSize: "12px", color: "#4b6358", fontWeight: "500" },
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  sectionTitle: { fontSize: "18px", fontWeight: "800", color: "#f0fdf4", margin: 0, letterSpacing: "-0.5px" },
  filterBtns: { display: "flex", gap: "8px" },
  filterBtn: {
    padding: "7px 16px",
    borderRadius: "8px",
    border: "1px solid",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s",
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
    transition: "border-color 0.2s, transform 0.2s",
  },
  taskTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  statusBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "100px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  doneBtn: {
    padding: "5px 12px",
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.3)",
    borderRadius: "8px",
    color: "#4ade80",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  taskTitle: { fontSize: "15px", fontWeight: "700", color: "#f0fdf4", margin: "0 0 8px", letterSpacing: "-0.3px" },
  taskDesc: { fontSize: "13px", color: "#4b6358", margin: "0 0 12px", lineHeight: "1.6" },
  completedBanner: {
    fontSize: "12px",
    color: "#4ade80",
    fontWeight: "600",
  },
  emptyState: { textAlign: "center", padding: "80px 20px" },
};