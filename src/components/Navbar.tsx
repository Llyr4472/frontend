import React from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";

interface NavbarProps {
  viewMode: "3d" | "2d";
  onToggleViewMode: (mode: "3d" | "2d") => void;
  stats: {
    total: number;
    critical: number;
    high: number;
    earthquakes: number;
    wildfires: number;
  };
  isRefreshing: boolean;
  onRefresh: () => void;
  onOpenReportModal: () => void;
  lastUpdated: Date;
}

const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onToggleViewMode,
  stats,
  isRefreshing,
  onRefresh,
  onOpenReportModal,
  lastUpdated,
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-2"
      style={{
        position: "fixed",
        top: "16px",
        left: "20px",
        width: "calc(100vw - 40px)",
        background: "rgba(252, 251, 247, 0.96)",
        backdropFilter: "blur(16px)",
        border: "1px solid #e2ddd5",
        borderRadius: "14px",
        zIndex: 1100,
        boxShadow: "0 10px 30px rgba(28, 25, 23, 0.08)",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between px-0">
        {/* Brand Logo & Live Status */}
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/"
            className="navbar-brand text-decoration-none d-flex align-items-center gap-2"
            style={{ color: "#1c1917", fontWeight: 800, fontSize: "19px", letterSpacing: "-0.4px" }}
          >
            <PublicIcon style={{ color: "#d97706", fontSize: "26px" }} />
            <span>Disalert</span>
          </Link>

          {/* Minimal Live Status Badge */}
          <div
            className="d-none d-md-flex align-items-center gap-2 px-3 py-1.5 rounded-2"
            style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              fontSize: "12px",
              color: "#047857",
              fontWeight: 600,
            }}
          >
            <span className="dot-live"></span>
            <span>Live Data Feed</span>
            <span style={{ color: "#d6cebf" }}>•</span>
            <span style={{ fontSize: "11.5px", color: "#78716c", fontWeight: 500 }}>
              {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Spacious 3D / 2D View Switcher */}
        <div className="d-flex align-items-center rounded-2 p-1" style={{ background: "#f5f2eb", border: "1px solid #e2ddd5" }}>
          <button
            onClick={() => onToggleViewMode("3d")}
            style={{
              background: viewMode === "3d" ? "#d97706" : "transparent",
              border: "none",
              color: viewMode === "3d" ? "#ffffff" : "#44403c",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "all 0.15s ease",
            }}
          >
            <PublicIcon style={{ fontSize: "16px" }} /> 3D Globe
          </button>
          <button
            onClick={() => onToggleViewMode("2d")}
            style={{
              background: viewMode === "2d" ? "#d97706" : "transparent",
              border: "none",
              color: viewMode === "2d" ? "#ffffff" : "#44403c",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "all 0.15s ease",
            }}
          >
            <MapIcon style={{ fontSize: "16px" }} /> 2D Map
          </button>
        </div>

        {/* Minimal Stats Indicators */}
        <div className="d-none d-xl-flex align-items-center gap-2.5" style={{ fontSize: "12.5px" }}>
          <div className="px-3 py-1.5 rounded-2" style={{ background: "#f5f2eb", border: "1px solid #e2ddd5" }}>
            <span style={{ color: "#78716c" }}>Total Monitored: </span>
            <strong style={{ color: "#1c1917" }}>{stats.total}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-2" style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}>
            <span style={{ color: "#dc2626" }}>Critical Hazards: </span>
            <strong style={{ color: "#dc2626" }}>{stats.critical}</strong>
          </div>
        </div>

        {/* Spacious Action Controls */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-sm d-flex align-items-center gap-1.5 rounded-2"
            onClick={onRefresh}
            disabled={isRefreshing}
            style={{
              background: "#f5f2eb",
              border: "1px solid #e2ddd5",
              color: "#44403c",
              padding: "8px 14px",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            <RefreshIcon
              style={{
                fontSize: "16px",
                transform: isRefreshing ? "rotate(360deg)" : "none",
                transition: "transform 1s linear",
              }}
            />
            <span className="d-none d-sm-inline">{isRefreshing ? "Refreshing" : "Refresh"}</span>
          </button>

          {/* High-Visibility Warm Amber Report Button */}
          <button
            onClick={onOpenReportModal}
            style={{
              background: "#d97706",
              color: "#ffffff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(217, 119, 6, 0.3)",
              cursor: "pointer",
              transition: "transform 0.15s ease",
            }}
          >
            <AddIcon style={{ fontSize: "18px", color: "#ffffff" }} />
            <span style={{ color: "#ffffff", fontWeight: 700 }}>Report Incident</span>
          </button>

          <Link
            to="/login"
            className="d-flex align-items-center justify-content-center ms-1 text-decoration-none"
            style={{ color: "#44403c" }}
            title="Account Profile"
          >
            <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;