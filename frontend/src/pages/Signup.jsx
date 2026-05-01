import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/signup`, form);
      alert("✅ Signup successful! Please login");
      navigate("/user-login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
    setLoading(false);
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
    { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
    { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
  ];

  return (
    <div style={styles.root}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* LEFT SIDE */}
        <div style={styles.leftPanel}>
          <div style={styles.brand}>
            <span>🌿</span>
            <span style={styles.brandName}>TaskFlow</span>
          </div>
          <h2 style={styles.leftTitle}>
            Join thousands of<br />
            <span style={styles.leftAccent}>productive teams</span>
          </h2>
          <p style={styles.leftSub}>
            Create your account in seconds and start managing tasks like a pro.
          </p>
          <div style={styles.perksGrid}>
            {[
              { icon: "⚡", text: "Instant setup" },
              { icon: "🔒", text: "Secure & private" },
              { icon: "📊", text: "Real-time updates" },
              { icon: "🆓", text: "Free to start" },
            ].map((p) => (
              <div key={p.text} style={styles.perkItem}>
                <span style={styles.perkIcon}>{p.icon}</span>
                <span style={styles.perkText}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightPanel}>
          <div style={styles.formHeader}>
            <div style={styles.headerIcon}>📝</div>
            <h3 style={styles.formTitle}>Create Account</h3>
            <p style={styles.formSub}>Fill in your details to get started</p>
          </div>

          {fields.map((f) => (
            <div key={f.key} style={styles.inputGroup}>
              <label style={styles.label}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                onFocus={() => setFocused(f.key)}
                onBlur={() => setFocused("")}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                style={{
                  ...styles.input,
                  borderColor: focused === f.key ? "#4ade80" : "rgba(255,255,255,0.1)",
                  boxShadow: focused === f.key ? "0 0 0 3px rgba(74,222,128,0.1)" : "none",
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{ ...styles.signupBtn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          <p style={styles.switchText}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/user-login")}
              style={styles.switchLink}
            >
              Sign in
            </span>
          </p>
          <p onClick={() => navigate("/")} style={styles.backLink}>
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
    top: "-80px",
    right: "-100px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
    bottom: "-80px",
    left: "-80px",
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
    padding: "52px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  brand: { display: "flex", alignItems: "center", gap: "8px" },
  brandName: { fontSize: "20px", fontWeight: "800", color: "#86efac", letterSpacing: "-0.5px" },
  leftTitle: {
    fontSize: "32px",
    fontWeight: "900",
    color: "#f0fdf4",
    lineHeight: "1.2",
    letterSpacing: "-1px",
    margin: 0,
  },
  leftAccent: {
    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  leftSub: { fontSize: "14px", color: "#4b6358", lineHeight: "1.7", margin: 0 },
  perksGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "8px",
  },
  perkItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    padding: "10px 12px",
  },
  perkIcon: { fontSize: "16px" },
  perkText: { fontSize: "12px", color: "#86efac", fontWeight: "600" },
  rightPanel: {
    flex: 1,
    background: "#0c1a0b",
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formHeader: { textAlign: "center", marginBottom: "28px" },
  headerIcon: { fontSize: "32px", marginBottom: "10px" },
  formTitle: { fontSize: "24px", fontWeight: "800", color: "#f0fdf4", margin: "0 0 6px", letterSpacing: "-0.5px" },
  formSub: { fontSize: "13px", color: "#4b6358", margin: 0 },
  inputGroup: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "7px",
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
  signupBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    color: "#000",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "4px",
    transition: "all 0.2s",
  },
  switchText: { textAlign: "center", fontSize: "13px", color: "#4b6358", margin: "16px 0 8px" },
  switchLink: { color: "#4ade80", cursor: "pointer", fontWeight: "600" },
  backLink: { textAlign: "center", fontSize: "13px", color: "#334155", cursor: "pointer", margin: 0 },
};