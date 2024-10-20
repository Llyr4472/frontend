import { useState } from "react";
import { Disaster } from "../types/disaster";

interface AlertsProps {
  recentAlerts: Disaster[];
}

function Alerts({ recentAlerts }: AlertsProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className="container-fluid alerts hover-effect"
      style={{
        backgroundColor: "rgba(0, 0, 51, 0.7)",
        backdropFilter: "blur(10px)",
        color: "#4d4dff",
        fontFamily: "monospace",
        padding: "20px",
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "300px",
        maxHeight: isMinimized ? "60px" : "400px",
        overflowY: "auto",
        borderRadius: "15px",
        boxShadow: "0 0 10px rgba(77, 77, 255, 0.5)",
        transition: "max-height 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            borderBottom: "1px solid #4d4dff",
            paddingBottom: "10px",
            fontSize: "18px",
            margin: 0,
          }}
        >
          Recent Alerts
        </h2>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          style={{
            background: "none",
            border: "none",
            color: "#4d4dff",
            cursor: "pointer",
            fontSize: "20px",
            padding: "5px",
          }}
        >
          {isMinimized ? "+" : "-"}
        </button>
      </div>
      <div
        style={{
          maxHeight: isMinimized ? "0" : "330px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {recentAlerts.map((alert, index) => (
            <li key={index} style={{ marginBottom: "10px", fontSize: "14px" }}>
              <span style={{ color: "#8080ff" }}>[{alert.date}]</span>{" "}
              <span style={{ color: "#b3b3ff" }}>{alert.type}</span>:{" "}
              {alert.location.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Alerts;
