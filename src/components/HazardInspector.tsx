import React from "react";
import { Disaster } from "../types/disaster";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VerifiedIcon from "@mui/icons-material/Verified";

interface HazardInspectorProps {
  disaster: Disaster | null;
  onClose: () => void;
  userLocation?: { latitude: number; longitude: number };
}

export const HazardInspector: React.FC<HazardInspectorProps> = ({
  disaster,
  onClose,
  userLocation,
}) => {
  if (!disaster) return null;

  const calculateDistanceKm = () => {
    if (!userLocation) return null;
    const R = 6371;
    const dLat = ((disaster.location.latitude - userLocation.latitude) * Math.PI) / 180;
    const dLon = ((disaster.location.longitude - userLocation.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.latitude * Math.PI) / 180) *
        Math.cos((disaster.location.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distance = calculateDistanceKm();

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
      className="panel-minimal position-fixed p-4"
      style={{
        bottom: "24px",
        left: "400px",
        zIndex: 1050,
        width: "calc(100vw - 440px)",
        maxWidth: "680px",
        background: "rgba(252, 251, 247, 0.98)",
        backdropFilter: "blur(16px)",
        border: "1px solid #e2ddd5",
        borderRadius: "14px",
        boxShadow: "0 14px 36px rgba(28, 25, 23, 0.12)",
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <span className={getSeverityBadgeClass(disaster.severity)}>{disaster.severity.toUpperCase()}</span>
          <span
            className="px-2 py-0.5 rounded-1"
            style={{ background: "#f5f2eb", color: "#44403c", fontSize: "11px", fontWeight: 600, border: "1px solid #e2ddd5" }}
          >
            {disaster.source}
          </span>
          <span className="d-flex align-items-center gap-1" style={{ color: "#059669", fontSize: "11.5px", fontWeight: 600 }}>
            <VerifiedIcon style={{ fontSize: "14px" }} /> Verified Telemetry
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none", color: "#78716c", cursor: "pointer", padding: "4px" }}
        >
          <CloseIcon style={{ fontSize: "18px" }} />
        </button>
      </div>

      <h5 style={{ fontWeight: 800, color: "#1c1917", margin: "0 0 6px 0", fontSize: "16px" }}>
        {disaster.title || `${disaster.type} - ${disaster.location.name}`}
      </h5>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-3" style={{ fontSize: "12.5px", color: "#78716c" }}>
        <span className="d-flex align-items-center gap-1">
          <LocationOnIcon style={{ fontSize: "15px", color: "#d97706" }} />
          {disaster.location.name}
        </span>
        <span>
          Coords: <strong style={{ color: "#1c1917" }}>{disaster.location.latitude.toFixed(4)}°, {disaster.location.longitude.toFixed(4)}°</strong>
        </span>
        {distance !== null && (
          <span>
            Distance: <strong style={{ color: distance < 500 ? "#dc2626" : "#1c1917" }}>{distance} km away</strong>
          </span>
        )}
        <span>Date: {disaster.date}</span>
      </div>

      {/* Metrics Row */}
      <div className="row g-2 mb-3">
        {disaster.magnitude !== undefined && (
          <div className="col-4">
            <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "10px 12px", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", color: "#78716c", fontWeight: 500 }}>Magnitude</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917" }}>M {disaster.magnitude}</div>
            </div>
          </div>
        )}

        {disaster.depthKm !== undefined && (
          <div className="col-4">
            <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "10px 12px", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", color: "#78716c", fontWeight: 500 }}>Depth</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917" }}>{disaster.depthKm} km</div>
            </div>
          </div>
        )}

        {(disaster as any).affectedRadiusKm !== undefined && (
          <div className="col-4">
            <div style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", padding: "10px 12px", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", color: "#78716c", fontWeight: 500 }}>Impact Zone</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#1c1917" }}>{(disaster as any).affectedRadiusKm} km</div>
            </div>
          </div>
        )}
      </div>

      {disaster.description && (
        <p style={{ fontSize: "12.5px", color: "#44403c", margin: "0 0 12px 0", lineHeight: 1.4 }}>
          {disaster.description}
        </p>
      )}

      {(disaster as any).link && (
        <a
          href={(disaster as any).link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d97706", fontSize: "12.5px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <span>View Official Agency Telemetry</span>
          <OpenInNewIcon style={{ fontSize: "14px" }} />
        </a>
      )}
    </div>
  );
};

export default HazardInspector;
