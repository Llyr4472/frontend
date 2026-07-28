import React, { useState } from "react";
import { UserReportInput, DisasterCategory, SeverityLevel } from "../types/disaster";
import MyLocationIcon from "@mui/icons-material/MyLocation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: UserReportInput) => void;
  userCoords?: { latitude: number; longitude: number };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  userCoords,
}) => {
  const [type, setType] = useState<DisasterCategory>("Earthquake");
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState<number>(userCoords?.latitude || 27.7172);
  const [longitude, setLongitude] = useState<number>(userCoords?.longitude || 85.324);
  const [severity, setSeverity] = useState<SeverityLevel>("High");
  const [description, setDescription] = useState("");

  const handleUseCurrentLocation = () => {
    if (userCoords) {
      setLatitude(userCoords.latitude);
      setLongitude(userCoords.longitude);
      if (!locationName) setLocationName("Current Device Location");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName) return;

    onSubmitReport({
      type,
      locationName,
      latitude: Number(latitude),
      longitude: Number(longitude),
      severity,
      description: description || `Reported ${type} event at ${locationName}.`,
    });

    setLocationName("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block modern-modal"
      tabIndex={-1}
      style={{
        backgroundColor: "rgba(28, 25, 23, 0.6)",
        backdropFilter: "blur(10px)",
        zIndex: 2000,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "16px", border: "1px solid #e2ddd5", background: "#fcfaf7", boxShadow: "0 20px 48px rgba(28, 25, 23, 0.16)", color: "#1c1917" }}>
          <div className="modal-header border-0 pb-0 pt-4 px-4">
            <h5 className="modal-title fw-bold" style={{ fontSize: "18px", color: "#1c1917" }}>
              Report Field Incident
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#44403c" }}>Disaster Category</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value as DisasterCategory)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                >
                  <option value="Earthquake">Earthquake</option>
                  <option value="Wildfire">Wildfire</option>
                  <option value="Storm">Storm / Hurricane</option>
                  <option value="Flood">Flood</option>
                  <option value="Volcano">Volcano</option>
                  <option value="Tsunami">Tsunami</option>
                  <option value="Landslide">Landslide</option>
                  <option value="Community Report">Community Hazard</option>
                </select>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-semibold mb-0" style={{ fontSize: "12px", color: "#44403c" }}>Location Name</label>
                  {userCoords && (
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-decoration-none p-0"
                      onClick={handleUseCurrentLocation}
                      style={{ color: "#d97706", fontSize: "11.5px", fontWeight: 600 }}
                    >
                      <MyLocationIcon style={{ fontSize: "13px" }} /> Use My GPS
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Kathmandu Valley, Nepal"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#44403c" }}>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    required
                    style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#44403c" }}>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    required
                    style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#44403c" }}>Severity Assessment</label>
                <select
                  className="form-select"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                >
                  <option value="Low">Low - Minor shaking / disruption</option>
                  <option value="Medium">Medium - Moderate damage</option>
                  <option value="High">High - Severe structural damage</option>
                  <option value="Critical">Critical - Evacuation Urged</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: "12px", color: "#44403c" }}>Incident Notes</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Provide observed conditions or field details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ borderRadius: "8px", border: "1px solid #e2ddd5", background: "#f5f2eb", color: "#1c1917" }}
                ></textarea>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm w-50"
                  onClick={onClose}
                  style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", color: "#44403c", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-amber w-50"
                  style={{ background: "#d97706", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, padding: "8px" }}
                >
                  Submit Incident Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;