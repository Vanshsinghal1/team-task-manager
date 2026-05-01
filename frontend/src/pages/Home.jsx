import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  return (
    <div style={styles.root}>
      
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.gridOverlay} />

     
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.logoIcon}>🌿</span>
          <span style={styles.logoText}>TaskFlow</span>
        </div>
        <div style={styles.navLinks}>
          {["Home", "About", "Pricing"].map((item) => (
            <button key={item} style={styles.navLink}>{item}</button>
          ))}
          <div style={styles.navDivider} />
          <button
            onClick={() => navigate("/user-login")}
            style={styles.navLoginBtn}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={styles.navCta}
          >
            Get Started →
          </button>
        </div>
      </nav>

      
      <div ref={heroRef} style={styles.hero}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          #1 Task Management Platform
        </div>

        <h1 style={styles.heroTitle}>
          Transform the Way
          <br />
          <span style={styles.heroAccent}>You Manage Tasks</span>
        </h1>

        <p style={styles.heroSub}>
          Streamline your workflow, assign tasks, and track progress
          <br />in one powerful platform built for modern teams.
        </p>

        
        <div style={styles.inputRow}>
          <input
            placeholder="Enter your work email"
            style={styles.emailInput}
          />
          <button
            onClick={() => navigate("/signup")}
            style={styles.ctaBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 0 24px rgba(134,239,172,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            Try for Free
          </button>
        </div>

        
        <div style={styles.roleRow}>
          <button
            onClick={() => navigate("/admin-login")}
            style={styles.adminBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.12)")}
          >
            <span>👑</span> Admin Portal
          </button>
          <button
            onClick={() => navigate("/user-login")}
            style={styles.userBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.12)")}
          >
            <span>👨‍💻</span> User Portal
          </button>
        </div>

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
    background: "radial-gradient(circle, rgba(34,90,22,0.35) 0%, transparent 70%)",
    top: "-100px",
    left: "-150px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(22,101,52,0.2) 0%, transparent 70%)",
    bottom: "-50px",
    right: "-100px",
    pointerEvents: "none",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(6,13,5,0.7)",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: { fontSize: "24px" },
  logoText: {
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "#86efac",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navLink: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px 14px",
    borderRadius: "8px",
    transition: "color 0.2s",
  },
  navDivider: {
    width: "1px",
    height: "20px",
    background: "rgba(255,255,255,0.12)",
    margin: "0 8px",
  },
  navLoginBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#e2e8f0",
    fontSize: "14px",
    cursor: "pointer",
    padding: "7px 20px",
    borderRadius: "10px",
    transition: "all 0.2s",
  },
  navCta: {
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    border: "none",
    color: "#000",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "8px 22px",
    borderRadius: "10px",
    transition: "all 0.2s",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "90px",
    paddingBottom: "80px",
    paddingLeft: "24px",
    paddingRight: "24px",
    position: "relative",
    zIndex: 1,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(22,163,74,0.15)",
    border: "1px solid rgba(34,197,94,0.3)",
    color: "#86efac",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: "100px",
    marginBottom: "32px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 8px #4ade80",
  },
  heroTitle: {
    fontSize: "clamp(40px, 6vw, 76px)",
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "-2px",
    marginBottom: "20px",
    color: "#f0fdf4",
  },
  heroAccent: {
    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: "17px",
    color: "#64748b",
    lineHeight: "1.7",
    maxWidth: "520px",
    marginBottom: "40px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "480px",
  },
  emailInput: {
    flex: 1,
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    backdropFilter: "blur(8px)",
  },
  ctaBtn: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    border: "none",
    borderRadius: "12px",
    color: "#000",
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  roleRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
    marginBottom: "56px",
  },
  adminBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 22px",
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "12px",
    color: "#fca5a5",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  userBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 22px",
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "12px",
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },

};