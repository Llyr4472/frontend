import React from "react";
import useLocation from "../hooks/useLocation";
import useDisasters from "../hooks/useDisasters";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

interface AlertUserProps {
  radius?: number;
}

export const AlertUser: React.FC<AlertUserProps> = ({ radius = 1000 }) => {
  const userLoc = useLocation();
  const { disasters, setSelectedDisaster } = useDisasters();
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed || !userLoc) return null;

  const nearby = disasters.map((alert) => {
    const R = 6371;
    const dLat = ((alert.location.latitude - userLoc.latitude) * Math.PI) / 180;
    const dLon = ((alert.location.longitude - userLoc.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLoc.latitude * Math.PI) / 180) *
        Math.cos((alert.location.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = Math.round(R * c);
    return { ...alert, dist };
  }).filter((a) => a.dist <= radius);

  if (nearby.length === 0) return null;

  const closest = nearby.sort((a, b) => a.dist - b.dist)[0];

  return (
    <div
      style={{
        position: "fixed",
        top: "76px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1050,
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: "12px",
        padding: "10px 18px",
        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.12)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <WarningAmberIcon style={{ color: "#dc2626", fontSize: "22px" }} />
      <div style={{ flex: 1, fontSize: "12.5px" }}>
        <strong style={{ color: "#dc2626" }}>Proximity Warning: {closest.type} ({closest.dist} km away)</strong>
        <div style={{ color: "#475569" }}>
          {closest.title || closest.location.name}. Stay vigilant and monitor local advisories.
        </div>
      </div>
      <button
        onClick={() => setSelectedDisaster(closest)}
        style={{
          background: "#dc2626",
          border: "none",
          color: "#ffffff",
          padding: "5px 12px",
          borderRadius: "6px",
          fontSize: "11.5px",
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Inspect
      </button>
      <button
        onClick={() => setDismissed(true)}
        style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}
      >
        <CloseIcon style={{ fontSize: "16px" }} />
      </button>
    </div>
  );
};

export default AlertUser;