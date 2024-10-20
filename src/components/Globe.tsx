import { useRef, useEffect, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { Disaster } from "../types/disaster";
// import * as THREE from "three";

interface MyGlobeProps {
  recentAlerts: Disaster[];
}

const MyGlobe = ({ recentAlerts }: MyGlobeProps) => {
  const globeRef = useRef<GlobeMethods>();
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const Data = recentAlerts.map((alert) => ({
    lat: alert.location.latitude,
    lng: alert.location.longitude,
    maxR: 10,
    severity: alert.severity,
    propagationSpeed: 1,
    repeatPeriod: 1000,
  }));

  const getTooltip = (d: any) => `
    <div style="text-align: center">
      <div><b>${d.type}</b>, ${d.location.name}</div>
      <div>Severity: <em>${d.severity}</em></div>
      <div>Date: <em>${d.date}</em></div>
      <div>${d.description ? `Description: ${d.description}` : ""}</div>
      <div>${d.reports ? `Number of Reports: ${d.reports}` : ""}</div>
    </div>
  `;

  useEffect(() => {
    const handleResize = () => {
      setGlobeSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      // Set up auto-rotation
      globe.controls().autoRotate = autoRotate;
      globe.controls().autoRotateSpeed = 0.5;
      // Adjust camera position
      globe.pointOfView({ altitude: 1.9 });

      // Add event listeners to stop rotation
      globe.controls().addEventListener("start", () => setAutoRotate(false));
    }
  }, [autoRotate]);

  const handleGlobeClick = (event: any) => {
    const { lat, lng } = event.point;
    console.log(`Clicked on: ${lat}, ${lng}`);
  };

  return (
    <div className="globe-container fluid-container">
      <Globe
        ref={globeRef}
        animateIn={true}
        onGlobeClick={handleGlobeClick}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        width={globeSize.width}
        height={globeSize.height}
        ringsData={Data}
        ringColor={(d: any) => {
          switch (d.severity) {
            case "Low":
              return (t: number) => `rgba(255, 255, 0, ${1 - t})`;
            case "Medium":
              return (t: number) => `rgba(255, 165, 0, ${1 - t})`;
            case "High":
              return (t: number) => `rgba(255, 69, 0, ${1 - t})`;
            case "Critical":
              return (t: number) => `rgba(255, 0, 0, ${1 - t})`;
            default:
              return (t: number) => `rgba(128, 128, 128, ${1 - t})`;
          }
        }}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        labelsData={recentAlerts}
        labelLat={(d: any) => d.location.latitude}
        labelLng={(d: any) => d.location.longitude}
        labelDotRadius={0.5}
        labelDotOrientation={() => "bottom"}
        labelColor={(d: any) => {
          switch (d.severity) {
            case "Low":
              return `rgba(255, 255, 0, 0.7)`;
            case "Medium":
              return `rgba(255, 165, 0, 0.7)`;
            case "High":
              return `rgba(255, 69, 0, 0.7)`;
            case "Critical":
              return `rgba(255, 0, 0, 0.7)`;
            default:
              return `rgba(128, 128, 128, 0.7)`;
          }
        }}
        labelText="type"
        labelSize={0.15}
        labelResolution={1}
        labelLabel={getTooltip}
      />
    </div>
  );
};
export default MyGlobe;