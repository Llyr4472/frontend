import { useRef, useEffect, useState, useMemo } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { Disaster } from "../types/disaster";
import PublicIcon from "@mui/icons-material/Public";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LayersIcon from "@mui/icons-material/Layers";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

interface MyGlobeProps {
  recentAlerts: Disaster[];
  selectedDisaster: Disaster | null;
  onSelectDisaster: (disaster: Disaster) => void;
  userLocation?: { latitude: number; longitude: number };
  sidebarCollapsed?: boolean;
}

const TEXTURES = {
  blueMarble: "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  night: "//unpkg.com/three-globe/example/img/earth-night.jpg",
  day: "//unpkg.com/three-globe/example/img/earth-day.jpg",
};

const getDynamicAltitude = () => {
  const w = window.innerWidth;
  if (w < 1024) return 2.0;
  if (w < 1440) return 1.75;
  if (w < 1680) return 1.6;
  return 1.5;
};

export const MyGlobe = ({
  recentAlerts,
  selectedDisaster,
  onSelectDisaster,
  userLocation,
  sidebarCollapsed = false,
}: MyGlobeProps) => {
  const globeRef = useRef<GlobeMethods>();
  const idleTimerRef = useRef<any>(null);

  const [globeSize, setGlobeSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [autoRotate, setAutoRotate] = useState(true); // Default Auto-Rotate enabled!
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [textureKey, setTextureKey] = useState<keyof typeof TEXTURES>("blueMarble");

  // Reset 5-second inactivity timer to auto-resume rotation
  const triggerInactivityTimer = () => {
    setAutoRotate(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, 5000);
  };

  // Handle Resize & Fullscreen canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      setGlobeSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const globe = globeRef.current;
      if (globe) {
        const camera = globe.camera() as any;
        if (camera && typeof camera.setViewOffset === "function") {
          if (!sidebarCollapsed) {
            camera.setViewOffset(
              window.innerWidth,
              window.innerHeight,
              -190,
              0,
              window.innerWidth,
              window.innerHeight
            );
          } else {
            camera.clearViewOffset();
          }
          camera.updateProjectionMatrix();
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarCollapsed]);

  // Set camera view offset & orbit controls event listeners
  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      const altitude = getDynamicAltitude();
      globe.pointOfView({ lat: 20, lng: 0, altitude }, 800);

      const camera = globe.camera() as any;
      if (camera && typeof camera.setViewOffset === "function") {
        if (!sidebarCollapsed) {
          camera.setViewOffset(
            window.innerWidth,
            window.innerHeight,
            -190,
            0,
            window.innerWidth,
            window.innerHeight
          );
        } else {
          camera.clearViewOffset();
        }
        camera.updateProjectionMatrix();
      }

      const controls = globe.controls();
      if (controls) {
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.4;
        controls.addEventListener("start", () => {
          triggerInactivityTimer();
        });
      }
    }
  }, [sidebarCollapsed]);

  // Sync autoRotate state with OrbitControls
  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      const controls = globe.controls();
      if (controls) {
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.4;
      }
    }
  }, [autoRotate]);

  // Fly to selected disaster
  useEffect(() => {
    const globe = globeRef.current;
    if (globe && selectedDisaster) {
      triggerInactivityTimer();
      globe.pointOfView(
        {
          lat: selectedDisaster.location.latitude,
          lng: selectedDisaster.location.longitude,
          altitude: 0.5,
        },
        1400
      );
    }
  }, [selectedDisaster]);

  const ringsData = useMemo(() => {
    return recentAlerts.map((alert) => ({
      lat: alert.location.latitude,
      lng: alert.location.longitude,
      maxR: alert.severity === "Critical" ? 14 : alert.severity === "High" ? 10 : 7,
      severity: alert.severity,
      propagationSpeed: alert.severity === "Critical" ? 1.5 : 1.0,
      repeatPeriod: 1500,
      alert: alert,
    }));
  }, [recentAlerts]);

  const pointsData = useMemo(() => {
    const data = recentAlerts.map((alert) => ({
      lat: alert.location.latitude,
      lng: alert.location.longitude,
      size: alert.severity === "Critical" ? 0.7 : 0.45,
      color:
        alert.severity === "Critical"
          ? "#dc2626"
          : alert.severity === "High"
          ? "#d97706"
          : alert.severity === "Medium"
          ? "#059669"
          : "#78716c",
      alert: alert,
    }));

    if (userLocation) {
      data.push({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
        size: 0.85,
        color: "#059669",
        alert: {
          id: "user-loc",
          type: "Community Report",
          title: "Your Location",
          date: "Now",
          location: { latitude: userLocation.latitude, longitude: userLocation.longitude, name: "Device Location" },
          severity: "Low",
          source: "System",
        } as Disaster,
      });
    }

    return data;
  }, [recentAlerts, userLocation]);

  const getTooltip = (d: any) => {
    const alert: Disaster = d.alert || d;
    if (!alert || !alert.type) return "";

    return `
      <div style="
        background: #fcfaf7;
        border: 1px solid #e2ddd5;
        padding: 12px 14px;
        border-radius: 10px;
        color: #1c1917;
        font-family: 'Plus Jakarta Sans', sans-serif;
        box-shadow: 0 12px 28px rgba(28, 25, 23, 0.15);
        max-width: 260px;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: #059669; font-size: 13px;">${alert.type}</strong>
          <span style="background: #f5f2eb; color: #44403c; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600;">${alert.source}</span>
        </div>
        <div style="font-weight: 600; font-size: 12.5px; margin-bottom: 4px; color: #1c1917;">${alert.title || alert.location.name}</div>
        <div style="font-size: 11px; color: #78716c;">
          Severity: <span style="color: ${
            alert.severity === 'Critical' ? '#dc2626' : alert.severity === 'High' ? '#d97706' : '#059669'
          }; font-weight: 700;">${alert.severity}</span>
        </div>
      </div>
    `;
  };

  const cycleTexture = () => {
    if (textureKey === "blueMarble") setTextureKey("night");
    else if (textureKey === "night") setTextureKey("day");
    else setTextureKey("blueMarble");
  };

  const handleZoomIn = () => {
    const globe = globeRef.current;
    if (globe) {
      triggerInactivityTimer();
      const currentPov = globe.pointOfView();
      globe.pointOfView({ ...currentPov, altitude: Math.max(0.2, currentPov.altitude - 0.4) }, 600);
    }
  };

  const handleZoomOut = () => {
    const globe = globeRef.current;
    if (globe) {
      triggerInactivityTimer();
      const currentPov = globe.pointOfView();
      globe.pointOfView({ ...currentPov, altitude: Math.min(3.5, currentPov.altitude + 0.4) }, 600);
    }
  };

  const handleFlyToRegion = (lat: number, lng: number, altitude = 0.9) => {
    const globe = globeRef.current;
    if (globe) {
      triggerInactivityTimer();
      globe.pointOfView({ lat, lng, altitude }, 1400);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#090d16",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <Globe
        ref={globeRef}
        animateIn={true}
        globeImageUrl={TEXTURES[textureKey]}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width={globeSize.width}
        height={globeSize.height}
        showAtmosphere={showAtmosphere}
        atmosphereColor="#059669"
        atmosphereAltitude={0.16}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.014}
        pointLabel={getTooltip}
        onPointClick={(pt: any) => {
          triggerInactivityTimer();
          if (pt && pt.alert && pt.alert.id !== "user-loc") {
            onSelectDisaster(pt.alert);
          }
        }}
        onGlobeClick={() => {
          triggerInactivityTimer();
        }}
        ringsData={ringsData}
        ringColor={(d: any) => {
          switch (d.severity) {
            case "Critical":
              return (t: number) => `rgba(220, 38, 38, ${1 - t})`;
            case "High":
              return (t: number) => `rgba(217, 119, 6, ${1 - t})`;
            case "Medium":
              return (t: number) => `rgba(5, 150, 105, ${1 - t})`;
            default:
              return (t: number) => `rgba(120, 113, 108, ${1 - t})`;
          }
        }}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />

      {/* Floating Control Toolbar */}
      <div
        className="panel-minimal position-fixed d-flex align-items-center gap-2 p-2"
        style={{
          right: "20px",
          top: "86px",
          zIndex: 100,
          background: "rgba(252, 251, 247, 0.96)",
          backdropFilter: "blur(16px)",
          border: "1px solid #e2ddd5",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(28, 25, 23, 0.08)",
        }}
      >
        <button
          className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
          onClick={handleZoomIn}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5" }}
          title="Zoom In"
        >
          <ZoomInIcon style={{ fontSize: "18px", color: "#44403c" }} />
        </button>
        <button
          className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
          onClick={handleZoomOut}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5" }}
          title="Zoom Out"
        >
          <ZoomOutIcon style={{ fontSize: "18px", color: "#44403c" }} />
        </button>
        <div style={{ width: "1px", height: "18px", background: "#e2ddd5" }}></div>
        <button
          className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
          onClick={() => {
            if (!autoRotate) setAutoRotate(true);
            else triggerInactivityTimer();
          }}
          style={{ background: autoRotate ? "rgba(217, 119, 6, 0.12)" : "#f5f2eb", border: "1px solid #e2ddd5" }}
          title={autoRotate ? "Auto Rotating (Click to Pause)" : "Start Auto Rotation"}
        >
          <AutorenewIcon style={{ fontSize: "18px", color: autoRotate ? "#d97706" : "#78716c" }} />
        </button>
        <button
          className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
          onClick={() => setShowAtmosphere(!showAtmosphere)}
          style={{ background: showAtmosphere ? "rgba(217, 119, 6, 0.12)" : "#f5f2eb", border: "1px solid #e2ddd5" }}
          title="Toggle Atmosphere Glow"
        >
          <PublicIcon style={{ fontSize: "18px", color: showAtmosphere ? "#d97706" : "#78716c" }} />
        </button>
        <button
          className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
          onClick={cycleTexture}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5" }}
          title={`Switch Texture (${textureKey})`}
        >
          <LayersIcon style={{ fontSize: "18px", color: "#78716c" }} />
        </button>
        {userLocation && (
          <button
            className="btn btn-sm p-2 rounded-2 d-flex align-items-center"
            onClick={() => handleFlyToRegion(userLocation.latitude, userLocation.longitude, 0.55)}
            style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}
            title="Fly to My Device Location"
          >
            <MyLocationIcon style={{ fontSize: "18px", color: "#059669" }} />
          </button>
        )}
      </div>

      {/* Floating Hotspot Navigator */}
      <div
        className="panel-minimal position-fixed d-none d-md-flex align-items-center gap-1.5 p-1.5"
        style={{
          right: "20px",
          top: "142px",
          zIndex: 100,
          background: "rgba(252, 251, 247, 0.96)",
          backdropFilter: "blur(16px)",
          border: "1px solid #e2ddd5",
          borderRadius: "10px",
          fontSize: "12px",
          boxShadow: "0 6px 16px rgba(28, 25, 23, 0.06)",
        }}
      >
        <span style={{ color: "#78716c", padding: "0 6px", fontWeight: 600 }}>Hotspots:</span>
        <button
          onClick={() => handleFlyToRegion(27.7, 85.3)}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", color: "#44403c", borderRadius: "6px", padding: "4px 10px", fontWeight: 500, cursor: "pointer" }}
        >
          Himalayas
        </button>
        <button
          onClick={() => handleFlyToRegion(36.7, -119.4)}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", color: "#44403c", borderRadius: "6px", padding: "4px 10px", fontWeight: 500, cursor: "pointer" }}
        >
          California
        </button>
        <button
          onClick={() => handleFlyToRegion(36.2, 138.2)}
          style={{ background: "#f5f2eb", border: "1px solid #e2ddd5", color: "#44403c", borderRadius: "6px", padding: "4px 10px", fontWeight: 500, cursor: "pointer" }}
        >
          Japan Ring of Fire
        </button>
        <button
          onClick={() => handleFlyToRegion(20, 0, getDynamicAltitude())}
          style={{ background: "#fffbeb", border: "1px solid #fde68a", color: "#d97706", borderRadius: "6px", padding: "4px 10px", fontWeight: 600, cursor: "pointer" }}
        >
          Global View
        </button>
      </div>
    </div>
  );
};

export default MyGlobe;