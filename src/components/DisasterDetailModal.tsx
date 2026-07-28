import React from "react";
import { Disaster } from "../types/disaster";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

interface DisasterDetailModalProps {
  disaster: Disaster | null;
  onClose: () => void;
  onFlyTo: (disaster: Disaster) => void;
}

export const DisasterDetailModal: React.FC<DisasterDetailModalProps> = ({
  disaster,
  onClose,
  onFlyTo,
}) => {
  if (!disaster) return null;

  return (
    <div
      className="modal d-block modern-modal"
      tabIndex={-1}
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(8px)",
        zIndex: 2050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ borderRadius: "16px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", boxShadow: "0 20px 48px rgba(15, 23, 42, 0.15)" }}>
          <div className="modal-header border-0 pb-0 pt-4 px-4">
            <div className="d-flex align-items-center gap-2">
              <span className={`badge-${disaster.severity.toLowerCase()}`}>
                {disaster.severity.toUpperCase()}
              </span>
              <span
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                }}
              >
                {disaster.source}
              </span>
              {disaster.verified && (
                <span className="d-flex align-items-center gap-1" style={{ fontSize: "11.5px", color: "#059669", fontWeight: 600 }}>
                  <CheckCircleOutlinedIcon style={{ fontSize: "15px" }} /> Verified Data
                </span>
              )}
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-4">
            <h3 className="fw-bold mb-2" style={{ fontSize: "20px", color: "#0f172a", letterSpacing: "-0.2px" }}>
              {disaster.title || `${disaster.type} Incident`}
            </h3>

            <div className="d-flex align-items-center gap-3 mb-4" style={{ fontSize: "13px", color: "#64748b" }}>
              <div className="d-flex align-items-center gap-1">
                <LocationOnOutlinedIcon style={{ color: "#d97706", fontSize: "16px" }} />
                <span style={{ color: "#0f172a", fontWeight: 600 }}>{disaster.location.name || "Global Location"}</span>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Coords: </span>
                <span style={{ color: "#0f172a", fontWeight: 600 }}>
                  {disaster.location.latitude.toFixed(4)}°, {disaster.location.longitude.toFixed(4)}°
                </span>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Date: </span>
                <span style={{ color: "#0f172a", fontWeight: 600 }}>{disaster.date}</span>
              </div>
            </div>

            {/* Key Metrics grid */}
            <div className="row g-3 mb-4">
              {disaster.magnitude !== undefined && (
                <div className="col-4">
                  <div
                    className="p-3 rounded-2"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500 }}>Magnitude</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      M {disaster.magnitude}
                    </div>
                  </div>
                </div>
              )}

              {disaster.depthKm !== undefined && (
                <div className="col-4">
                  <div
                    className="p-3 rounded-2"
                    style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                  >
                    <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500 }}>Hypocenter Depth</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                      {disaster.depthKm} km
                    </div>
                  </div>
                </div>
              )}

              <div className="col-4">
                <div
                  className="p-3 rounded-2"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <div style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 500 }}>Field Reports</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>
                    {disaster.reports || 1}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div
              className="p-3 rounded-2 mb-4"
              style={{
                background: "#f8fafc",
                borderLeft: "4px solid #d97706",
                borderTop: "1px solid #e2e8f0",
                borderRight: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
                color: "#334155",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              <strong style={{ color: "#0f172a" }}>Summary: </strong>
              {disaster.description || "Active natural incident tracked in real-time."}
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between align-items-center pt-3 border-top" style={{ borderColor: "#e2e8f0" }}>
              <div>
                {(disaster as any).url && (
                  <a
                    href={(disaster as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1 rounded-2"
                    style={{ fontSize: "12px", color: "#d97706", borderColor: "#cbd5e1", fontWeight: 600 }}
                  >
                    <span>View Telemetry Data</span>
                    <OpenInNewIcon style={{ fontSize: "13px" }} />
                  </a>
                )}
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm rounded-2"
                  onClick={onClose}
                  style={{ background: "#f1f5f9", color: "#475569", fontSize: "13px", fontWeight: 600, border: "1px solid #cbd5e1" }}
                >
                  Close
                </button>
                <button
                  className="btn btn-amber btn-sm rounded-2"
                  onClick={() => {
                    onFlyTo(disaster);
                    onClose();
                  }}
                  style={{ background: "#d97706", color: "#ffffff", border: "none", fontSize: "13px", fontWeight: 700, padding: "7px 16px" }}
                >
                  Locate on 3D Globe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetailModal;
