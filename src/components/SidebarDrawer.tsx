import React, { useState } from "react";
import { Disaster } from "../types/disaster";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download";

interface SidebarDrawerProps {
  recentAlerts: Disaster[];
  selectedDisaster: Disaster | null;
  onSelectDisaster: (disaster: Disaster) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  userLocation?: { latitude: number; longitude: number };
  proximityRadius: number;
  onRadiusChange: (radius: number) => void;
  soundAlertsEnabled: boolean;
  onToggleSoundAlerts: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  stats: {
    total: number;
    critical: number;
    high: number;
    earthquakes: number;
    wildfires: number;
    storms: number;
  };
}

const CATEGORIES = ["All", "Earthquake", "Wildfire", "Storm", "Flood", "Volcano", "Community Report"];

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  recentAlerts,
  selectedDisaster,
  onSelectDisaster,
  activeCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  proximityRadius,
  onRadiusChange,
  soundAlertsEnabled,
  onToggleSoundAlerts,
  collapsed,
  onToggleCollapse,
  stats,
}) => {
  const [activeTab, setActiveTab] = useState<"stream" | "analytics" | "safety" | "settings">("stream");
  const [minMagnitude, setMinMagnitude] = useState<number>(0);

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

  const filteredByMag = recentAlerts.filter((alert) => {
    if (minMagnitude === 0) return true;
    if (alert.magnitude !== undefined) return alert.magnitude >= minMagnitude;
    return true;
  });

  const triggerAudioChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const handleDownloadEmergencyGuide = () => {
    const guideText = `DISALERT EMERGENCY SURVIVAL CHECKLIST
=======================================
1. EARTHQUAKE PREPARATION:
   - Secure heavy furniture & electronics.
   - Drop, Cover, and Hold On during shaking.
   - Prepare emergency go-bag: 3 days of water, non-perishable food, flashlight, first-aid kit.

2. WILDFIRE EVACUATION:
   - Keep N95 masks & protective eyewear accessible.
   - Follow local evacuation routes. Keep vehicle fuel above half tank.

3. FLOOD & SEVERE STORM:
   - Turn off main electricity breakers if water enters structure.
   - Never walk or drive through flowing floodwaters (6 inches can knock you down).

4. EMERGENCY TELEPHONE NUMBERS:
   - General Emergency: 911 / 112
   - Red Cross Hotline: 1-800-RED-CROSS
=======================================`;

    const blob = new Blob([guideText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Disalert_Emergency_Survival_Plan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="panel-minimal"
      style={{
        position: "fixed",
        left: "20px",
        top: "84px",
        height: "calc(100vh - 104px)",
        width: collapsed ? "56px" : "360px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        background: "rgba(252, 251, 247, 0.96)",
        backdropFilter: "blur(16px)",
        border: "1px solid #e2ddd5",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(28, 25, 23, 0.08)",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Sidebar Header & Tab Bar */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #e2ddd5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f5f2eb",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setActiveTab("stream")}
              style={{
                background: activeTab === "stream" ? "#d97706" : "transparent",
                border: "none",
                color: activeTab === "stream" ? "#ffffff" : "#44403c",
                padding: "7px 12px",
                borderRadius: "7px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.15s ease",
              }}
              title="Live Hazard Stream"
            >
              <RssFeedIcon style={{ fontSize: "16px" }} /> Stream
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              style={{
                background: activeTab === "analytics" ? "#d97706" : "transparent",
                border: "none",
                color: activeTab === "analytics" ? "#ffffff" : "#44403c",
                padding: "7px 12px",
                borderRadius: "7px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.15s ease",
              }}
              title="Global Analytics"
            >
              <BarChartIcon style={{ fontSize: "16px" }} /> Analytics
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              style={{
                background: activeTab === "safety" ? "#d97706" : "transparent",
                border: "none",
                color: activeTab === "safety" ? "#ffffff" : "#44403c",
                padding: "7px 12px",
                borderRadius: "7px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.15s ease",
              }}
              title="Safety & Evacuation"
            >
              <SecurityIcon style={{ fontSize: "16px" }} /> Safety
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              style={{
                background: activeTab === "settings" ? "#d97706" : "transparent",
                border: "none",
                color: activeTab === "settings" ? "#ffffff" : "#44403c",
                padding: "7px 10px",
                borderRadius: "7px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              title="Preferences"
            >
              <TuneIcon style={{ fontSize: "16px" }} />
            </button>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          style={{
            background: "#f5f2eb",
            border: "1px solid #e2ddd5",
            color: "#44403c",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
          }}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRightIcon style={{ fontSize: "18px" }} /> : <ChevronLeftIcon style={{ fontSize: "18px" }} />}
        </button>
      </div>

      {!collapsed && (
        <div style={{ padding: "16px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* TAB 1: LIVE STREAM */}
          {activeTab === "stream" && (
            <>
              {/* Search Bar & Magnitude Threshold Selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <SearchIcon style={{ position: "absolute", left: "12px", color: "#78716c", fontSize: "17px" }} />
                  <input
                    type="text"
                    placeholder="Search location or incident..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px 8px 36px",
                      background: "#f5f2eb",
                      border: "1px solid #e2ddd5",
                      borderRadius: "8px",
                      color: "#1c1917",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#44403c" }}>
                  <span style={{ fontWeight: 500 }}>Min Magnitude Threshold:</span>
                  <select
                    value={minMagnitude}
                    onChange={(e) => setMinMagnitude(Number(e.target.value))}
                    style={{
                      background: "#fcfaf7",
                      border: "1px solid #e2ddd5",
                      color: "#1c1917",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                    }}
                  >
                    <option value={0}>All Magnitudes</option>
                    <option value={4.0}>Mag 4.0+</option>
                    <option value={5.0}>Mag 5.0+</option>
                    <option value={6.0}>Mag 6.0+ (Major)</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    style={{
                      background: activeCategory === cat ? "#d97706" : "#f5f2eb",
                      border: activeCategory === cat ? "none" : "1px solid #e2ddd5",
                      color: activeCategory === cat ? "#ffffff" : "#44403c",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Stream Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredByMag.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#78716c", padding: "24px 0", fontSize: "13px" }}>
                    No hazards match selected filter criteria.
                  </div>
                ) : (
                  filteredByMag.map((alert) => {
                    const isSelected = selectedDisaster?.id === alert.id;
                    return (
                      <div
                        key={alert.id}
                        onClick={() => {
                          if (soundAlertsEnabled) triggerAudioChime();
                          onSelectDisaster(alert);
                        }}
                        style={{
                          background: isSelected ? "#fffbeb" : "#fcfaf7",
                          border: isSelected ? "1.5px solid #d97706" : "1px solid #e2ddd5",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          boxShadow: isSelected ? "0 4px 12px rgba(217, 119, 6, 0.12)" : "0 2px 6px rgba(28, 25, 23, 0.03)",
                        }}
                        className="hover-card"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 700, fontSize: "13px", color: "#1c1917" }}>
                            {alert.type}
                          </span>
                          <span className={getSeverityBadgeClass(alert.severity)}>
                            {alert.severity}
                          </span>
                        </div>

                        <div style={{ fontSize: "12.5px", color: "#44403c", fontWeight: 600, lineHeight: 1.3 }}>
                          {alert.title || alert.location.name}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#78716c" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                            <LocationOnOutlinedIcon style={{ fontSize: "14px", color: "#d97706" }} />
                            {alert.location.name || "Global"}
                          </span>
                          <span>{alert.date}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* TAB 2: ANALYTICS & TELEMETRY */}
          {activeTab === "analytics" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1c1917" }}>Global Telemetry Summary</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "12px", borderRadius: "10px" }}>
                  <div style={{ fontSize: "11.5px", color: "#78716c", fontWeight: 500 }}>Total Monitored</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#1c1917", marginTop: "2px" }}>{stats.total}</div>
                </div>

                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "12px", borderRadius: "10px" }}>
                  <div style={{ fontSize: "11.5px", color: "#dc2626", fontWeight: 500 }}>Critical Hazards</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#dc2626", marginTop: "2px" }}>{stats.critical}</div>
                </div>

                <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "12px", borderRadius: "10px" }}>
                  <div style={{ fontSize: "11.5px", color: "#78716c", fontWeight: 500 }}>Earthquakes</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#1c1917", marginTop: "2px" }}>{stats.earthquakes}</div>
                </div>

                <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "12px", borderRadius: "10px" }}>
                  <div style={{ fontSize: "11.5px", color: "#78716c", fontWeight: 500 }}>Fires & Storms</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#d97706", marginTop: "2px" }}>{stats.wildfires + stats.storms}</div>
                </div>
              </div>

              <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "14px", borderRadius: "10px" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#1c1917", marginBottom: "8px" }}>Active Data Pipelines</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#44403c" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>USGS Earthquake Feed</span>
                    <strong style={{ color: "#059669" }}>Connected (GeoJSON)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>NASA EONET Telemetry</span>
                    <strong style={{ color: "#059669" }}>Connected (v2.1)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Community Incident Network</span>
                    <strong style={{ color: "#d97706" }}>Active</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY & EMERGENCY ACTION HUB */}
          {activeTab === "safety" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1c1917" }}>Emergency Safety Action Hub</div>

              <button
                onClick={handleDownloadEmergencyGuide}
                className="btn btn-amber btn-spacious d-flex align-items-center justify-content-center gap-2"
              >
                <DownloadIcon style={{ fontSize: "18px" }} />
                <span>Download Emergency Survival Plan</span>
              </button>

              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "14px", borderRadius: "10px", fontSize: "12.5px" }}>
                <strong style={{ color: "#dc2626", display: "block", marginBottom: "6px", fontSize: "13px" }}>🌋 Earthquake Action Plan</strong>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#44403c", lineHeight: 1.5 }}>
                  <li>Drop, Cover, Hold On under sturdy furniture.</li>
                  <li>Avoid doorways, windows, and exterior walls.</li>
                  <li>Expect aftershocks. Keep shoes near bed.</li>
                </ul>
              </div>

              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "14px", borderRadius: "10px", fontSize: "12.5px" }}>
                <strong style={{ color: "#b45309", display: "block", marginBottom: "6px", fontSize: "13px" }}>🔥 Wildfire Evacuation Checklist</strong>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#44403c", lineHeight: 1.5 }}>
                  <li>Close all windows and interior doors to prevent drafts.</li>
                  <li>Keep N95 masks and go-bags packed in vehicle.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES & SETTINGS */}
          {activeTab === "settings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1c1917" }}>Monitoring Preferences</div>

              <div>
                <label style={{ fontSize: "12.5px", color: "#44403c", display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Proximity Alert Radius: <strong style={{ color: "#1c1917" }}>{proximityRadius} km</strong>
                </label>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={100}
                  value={proximityRadius}
                  onChange={(e) => onRadiusChange(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#d97706" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #e2ddd5" }}>
                <span style={{ fontSize: "13px", color: "#1c1917", fontWeight: 500 }}>Audio Alert Chimes</span>
                <button
                  onClick={() => {
                    if (!soundAlertsEnabled) triggerAudioChime();
                    onToggleSoundAlerts();
                  }}
                  style={{
                    background: soundAlertsEnabled ? "#fffbeb" : "#f5f2eb",
                    border: soundAlertsEnabled ? "1px solid #fde68a" : "1px solid #e2ddd5",
                    color: soundAlertsEnabled ? "#b45309" : "#78716c",
                    borderRadius: "8px",
                    padding: "7px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  {soundAlertsEnabled ? <VolumeUpIcon style={{ fontSize: "18px" }} /> : <VolumeOffIcon style={{ fontSize: "18px" }} />}
                  <span>{soundAlertsEnabled ? "Enabled" : "Muted"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarDrawer;
