import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("disalert_user", JSON.stringify({ email, loggedIn: true }));
    navigate("/");
  };

  return (
    <div
      className="vh-100 w-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <div className="container" style={{ maxWidth: "420px" }}>
        <div className="panel-minimal p-4 p-md-5 text-center" style={{ background: "#ffffff", border: "1px solid #cbd5e1", boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)" }}>
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <PublicIcon style={{ color: "#d97706", fontSize: "28px" }} />
            <h2 className="fw-bold mb-0" style={{ fontSize: "22px", color: "#0f172a", letterSpacing: "-0.4px" }}>
              Disalert
            </h2>
          </div>

          <p className="mb-4" style={{ fontSize: "13px", color: "#64748b" }}>
            Sign in to access telemetry alerts and proximity warnings.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#475569" }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="operator@disalert.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "13px",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              />
            </div>

            <div className="mb-4 text-start">
              <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#475569" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "13px",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-amber w-100 py-2.5 fw-bold mb-3"
              style={{
                background: "#d97706",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            >
              Sign In
            </button>
          </form>

          <div className="d-flex justify-content-between align-items-center pt-3 border-top" style={{ borderColor: "#e2e8f0", fontSize: "12.5px" }}>
            <Link to="/signup" className="text-decoration-none fw-semibold" style={{ color: "#d97706" }}>
              Create Account
            </Link>
            <Link to="/" className="text-decoration-none d-flex align-items-center gap-1" style={{ color: "#64748b" }}>
              <ArrowBackIcon style={{ fontSize: "14px" }} />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;