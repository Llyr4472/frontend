import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MyGlobe from "./components/Globe";
import MapView2D from "./components/MapView2D";
import Navbar from "./components/Navbar";
import SidebarDrawer from "./components/SidebarDrawer";
import HazardInspector from "./components/HazardInspector";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertUser from "./components/AlertUser";

import useDisasters from "./hooks/useDisasters";
import useLocation from "./hooks/useLocation";
import { Disaster } from "./types/disaster";

const Dashboard = () => {
  const {
    disasters,
    isRefreshing,
    lastUpdated,
    selectedDisaster,
    setSelectedDisaster,
    filters,
    setFilters,
    refreshDisasters,
    addCommunityReport,
    stats,
  } = useDisasters();

  const userLocation = useLocation();
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [proximityRadius, setProximityRadius] = useState<number>(1000);
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const handleSelectDisaster = (disaster: Disaster) => {
    setSelectedDisaster(disaster);
  };

  const handleCategorySelect = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  return (
    <div id="app-root">
      {/* Viewport Canvas: 3D Globe or 2D Leaflet Map */}
      {viewMode === "3d" ? (
        <MyGlobe
          recentAlerts={disasters}
          selectedDisaster={selectedDisaster}
          onSelectDisaster={handleSelectDisaster}
          userLocation={
            userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined
          }
          sidebarCollapsed={sidebarCollapsed}
        />
      ) : (
        <MapView2D
          recentAlerts={disasters}
          selectedDisaster={selectedDisaster}
          onSelectDisaster={handleSelectDisaster}
          userLocation={
            userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined
          }
        />
      )}

      {/* Top Navigation & Live View Mode Bar */}
      <Navbar
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        stats={stats}
        isRefreshing={isRefreshing}
        onRefresh={refreshDisasters}
        onOpenReportModal={() => {
          setSelectedDisaster(null);
          setIsReportModalOpen(true);
        }}
        lastUpdated={lastUpdated}
      />

      {/* Collapsible Command Sidebar Drawer */}
      <SidebarDrawer
        recentAlerts={disasters}
        selectedDisaster={selectedDisaster}
        onSelectDisaster={handleSelectDisaster}
        activeCategory={filters.category}
        onSelectCategory={handleCategorySelect}
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
        userLocation={
          userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined
        }
        proximityRadius={proximityRadius}
        onRadiusChange={(r) => setProximityRadius(r)}
        soundAlertsEnabled={soundAlertsEnabled}
        onToggleSoundAlerts={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        stats={stats}
      />

      {/* Proximity Warning Alert Header */}
      <AlertUser radius={proximityRadius} />

      {/* Floating Non-Blocking Bottom Inspector Card */}
      <HazardInspector
        disaster={selectedDisaster}
        onClose={() => setSelectedDisaster(null)}
        userLocation={
          userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined
        }
      />

      {/* User Incident Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={addCommunityReport}
        userCoords={
          userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined
        }
      />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
