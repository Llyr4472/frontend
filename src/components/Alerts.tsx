import { useState } from "react";
import { Disaster } from "../types/disaster";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface AlertsProps {
  recentAlerts: Disaster[];
  selectedDisaster: Disaster | null;
  onSelectDisaster: (disaster: Disaster) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CATEGORIES = ["All", "Earthquake", "Wildfire", "Storm", "Flood", "Volcano", "Community Report"];

function Alerts({
  recentAlerts,
  selectedDisaster,
  onSelectDisaster,
  activeCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}: AlertsProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "badge-critical";
      case "High":
        return "badge-high";
      case "Medium":
        return "badge-medium";
      default:
        return "badge-low";
    }
  };

  return (
    <div
      className="panel-minimal alerts"
      style={{
        position: "fixed",
        right: "24px",
        top: "76px",
        width: "360px",
        maxHeight: isMinimized ? "52px" : "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Drawer Header */}
      <div
        style={{
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: isMinimized ? "none" : "1px solid rgba(255, 255, 255, 0.07)",
          cursor: "pointer",
        }}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="dot-live"></span>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: 600,
              margin: 0,
              color: "#f8fafc",
              letterSpacing: "-0.2px",
            }}
          >
            Live Alerts
          </h2>
          <span
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "#94a3b8",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "6px",
            }}
          >
            {recentAlerts.length}
          </span>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          {isMinimized ? <ChevronRightIcon style={{ fontSize: "20px" }} /> : <ExpandMoreIcon style={{ fontSize: "20px" }} />}
        </button>
      </div>

      {!isMinimized && (
        <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
          {/* Quick Search */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon
              style={{
                position: "absolute",
                left: "10px",
                color: "#64748b",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              placeholder="Filter by location or type..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: "100%",
                padding: "7px 10px 7px 32px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
                outline: "none",
              }}
            />
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "4px",
              alignItems: "center",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  background: activeCategory === cat ? "#6366f1" : "rgba(255, 255, 255, 0.04)",
                  border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.06)",
                  color: activeCategory === cat ? "#ffffff" : "#94a3b8",
                  padding: "3px 9px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alerts Feed Items */}
          <div
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 250px)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingRight: "2px",
            }}
          >
            {recentAlerts.length === 0 ? (
              <div style={{ textAlign: "center", color: "#64748b", padding: "24px 10px", fontSize: "12px" }}>
                No active disasters match your filter criteria.
              </div>
            ) : (
              recentAlerts.map((alert) => {
                const isSelected = selectedDisaster?.id === alert.id;
                return (
                  <div
                    key={alert.id}
                    onClick={() => onSelectDisaster(alert)}
                    style={{
                      background: isSelected ? "rgba(99, 102, 241, 0.12)" : "rgba(255, 255, 255, 0.02)",
                      border: isSelected ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                    className="hover-card"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 600, fontSize: "12.5px", color: "#f8fafc" }}>
                        {alert.type}
                      </span>
                      <span className={getSeverityBadgeClass(alert.severity)}>
                        {alert.severity}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 500, lineHeight: 1.3 }}>
                      {alert.title || alert.location.name}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "11px",
                        color: "#64748b",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <LocationOnOutlinedIcon style={{ fontSize: "13px" }} />
                        {alert.location.name || "Global"}
                      </span>
                      <span>{alert.date}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;
