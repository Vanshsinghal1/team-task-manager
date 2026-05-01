import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin-login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );
      if (isAdminRoute && res.data.user.role !== "admin") {
        alert("❌ Not an admin account");
        setLoading(false);
        return;
      }
      if (!isAdminRoute && res.data.user.role === "admin") {
        alert("❌ Please use admin login");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);
      if (res.data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
       
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <div style={styles.brand}>
              <span>🌿</span>
              <span style={styles.brandName}>TaskFlow</span>
            </div>
            <h2 style={styles.leftTitle}>
              {isAdminRoute ? "Admin" : "Welcome"}<br />
              <span style={styles.leftAccent}>
                {isAdminRoute ? "Command Center" : "Back!"}
              </span>
            </h2>
            <p style={styles.leftSub}>
              {isAdminRoute
                ? "Manage users, assign tasks, and oversee your team's progress."
                : "View your tasks, track progress, and stay productive."}
            </p>
            <div style={styles.featuresBox}>
              {(isAdminRoute
                ? ["Assign tasks to users", "Monitor team progress", "Full control panel"]
                : ["View assigned tasks", "Mark tasks as done", "Real-time updates"]
              ).map((f) => (
                <div key={f} style={styles.featureItem}>
                  <span style={styles.featureDot}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div style={styles.rightPanel}>
          <div style={styles.formHeader}>
            <div style={styles.roleIcon}>
              {isAdminRoute ? "👑" : "👨‍💻"}
            </div>
            <h3 style={styles.formTitle}>
              {isAdminRoute ? "Admin Login" : "User Login"}
            </h3>
            <p style={styles.formSub}>Enter your credentials to continue</p>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              placeholder="you@example.com"
              required
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                ...styles.input,
                borderColor: focused === "email" ? "#4ade80" : "rgba(255,255,255,0.1)",
                boxShadow: focused === "email" ? "0 0 0 3px rgba(74,222,128,0.1)" : "none",
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              placeholder="••••••••"
              type="password"
              required
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                ...styles.input,
                borderColor: focused === "password" ? "#4ade80" : "rgba(255,255,255,0.1)",
                boxShadow: focused === "password" ? "0 0 0 3px rgba(74,222,128,0.1)" : "none",
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.loginBtn,
              background: isAdminRoute
                ? "linear-gradient(135deg, #dc2626, #ef4444)"
                : "linear-gradient(135deg, #16a34a, #22c55e)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <span style={styles.loadingText}>Authenticating...</span>
            ) : (
              `Sign in as ${isAdminRoute ? "Admin" : "User"} →`
            )}
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {!isAdminRoute && (
            <p style={styles.switchText}>
              New here?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={styles.switchLink}
              >
                Create an account
              </span>
            </p>
          )}
          <p
            onClick={() => navigate("/")}
            style={styles.backLink}
          >
            ← Back to Home
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#060d05",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  blob1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)",
    top: "-100px",
    left: "-100px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
    bottom: "-80px",
    right: "-80px",
    pointerEvents: "none",
  },
  card: {
    display: "flex",
    width: "100%",
    maxWidth: "860px",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
    position: "relative",
    zIndex: 1,
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(145deg, #0a1f0a, #0d2b14)",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  leftContent: { display: "flex", flexDirection: "column", gap: "20px" },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#86efac",
    letterSpacing: "-0.5px",
  },
  leftTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#f0fdf4",
    lineHeight: "1.15",
    letterSpacing: "-1px",
    margin: 0,
  },
  leftAccent: {
    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  leftSub: {
    fontSize: "14px",
    color: "#4b6358",
    lineHeight: "1.7",
    margin: 0,
  },
  featuresBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "8px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
    color: "#86efac",
  },
  featureDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "rgba(74,222,128,0.15)",
    border: "1px solid rgba(74,222,128,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    flexShrink: 0,
  },
  rightPanel: {
    flex: 1,
    background: "#0c1a0b",
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formHeader: { textAlign: "center", marginBottom: "32px" },
  roleIcon: { fontSize: "36px", marginBottom: "12px" },
  formTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#f0fdf4",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  formSub: { fontSize: "13px", color: "#4b6358", margin: 0 },
  inputGroup: { marginBottom: "18px" },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    color: "#000",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.2s",
    letterSpacing: "-0.2px",
  },
  loadingText: { opacity: 0.7 },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  },
  dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" },
  dividerText: { fontSize: "12px", color: "#334155" },
  switchText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#4b6358",
    margin: "0 0 12px",
  },
  switchLink: {
    color: "#4ade80",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
  },
  backLink: {
    textAlign: "center",
    fontSize: "13px",
    color: "#334155",
    cursor: "pointer",
    transition: "color 0.2s",
  },
};