import React, { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Disaster } from "../types/disaster";

interface MapView2DProps {
  recentAlerts: Disaster[];
  selectedDisaster: Disaster | null;
  onSelectDisaster: (disaster: Disaster) => void;
  userLocation?: { latitude: number; longitude: number };
}

const MapRecenter = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 6, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const MapContainerComp = MapContainer as any;
const TileLayerComp = TileLayer as any;
const CircleMarkerComp = CircleMarker as any;
const PopupComp = Popup as any;

export const MapView2D: React.FC<MapView2DProps> = ({
  recentAlerts,
  selectedDisaster,
  onSelectDisaster,
  userLocation,
}) => {
  const defaultCenter: [number, number] = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [20, 0];

  const selectedCenter: [number, number] | null = selectedDisaster
    ? [selectedDisaster.location.latitude, selectedDisaster.location.longitude]
    : null;

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "#dc2626";
      case "High":
        return "#d97706";
      case "Medium":
        return "#059669";
      default:
        return "#78716c";
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 1 }}>
      <MapContainerComp
        center={defaultCenter}
        zoom={3}
        style={{ width: "100%", height: "100%", background: "#f5f2eb" }}
        zoomControl={false}
      >
        <TileLayerComp
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapRecenter center={selectedCenter} />

        {userLocation && (
          <CircleMarkerComp
            center={[userLocation.latitude, userLocation.longitude]}
            radius={9}
            pathOptions={{
              color: "#059669",
              fillColor: "#059669",
              fillOpacity: 0.85,
              weight: 3,
            }}
          >
            <PopupComp>
              <div style={{ color: "#1c1917", fontWeight: 700 }}>Your Device Location</div>
            </PopupComp>
          </CircleMarkerComp>
        )}

        {recentAlerts.map((alert) => {
          const color = getMarkerColor(alert.severity);
          const isSelected = selectedDisaster?.id === alert.id;

          return (
            <CircleMarkerComp
              key={alert.id}
              center={[alert.location.latitude, alert.location.longitude]}
              radius={alert.severity === "Critical" ? 11 : alert.severity === "High" ? 9 : 7}
              pathOptions={{
                color: isSelected ? "#1c1917" : color,
                fillColor: color,
                fillOpacity: isSelected ? 0.95 : 0.75,
                weight: isSelected ? 3 : 1.5,
              }}
              eventHandlers={{
                click: () => onSelectDisaster(alert),
              }}
            >
              <PopupComp>
                <div style={{ color: "#1c1917", fontFamily: "sans-serif", padding: "4px" }}>
                  <strong style={{ fontSize: "13px", display: "block", color: "#d97706" }}>{alert.type}</strong>
                  <div style={{ fontSize: "12px", color: "#44403c", fontWeight: 600 }}>{alert.title || alert.location.name}</div>
                  <div style={{ fontSize: "11px", color: color, fontWeight: "bold", marginTop: "4px" }}>
                    Severity: {alert.severity}
                  </div>
                </div>
              </PopupComp>
            </CircleMarkerComp>
          );
        })}
      </MapContainerComp>
    </div>
  );
};

export default MapView2D;
