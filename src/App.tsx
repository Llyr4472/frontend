import MyGlobe from "./components/Globe";
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import Modal from "./components/Modal";
import Login from "./components/Login";
import {AlertUser} from "./components/AlertUser";

import useDisaster from './hooks/useDisasters';
import {
  Route,
  Routes,
  Navigate,
  } from "react-router-dom";
import Signup from "./components/Signup";

const App = () => {

  const handleSearch = (searchTerm: string) => {
    console.log("Search:", searchTerm);
  };

  const handleFilter = (type: string) => {
    console.log("Filter:", type);
  };

  const handleAlertClick = (alert: any) => {
    console.log("Alert clicked:", alert);
  };
    const {disasters} = useDisaster();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={
          <>
            <div id="app-root">
              <MyGlobe recentAlerts={disasters} />
              <Navbar
                onSearch={handleSearch}
                onFilter={handleFilter}
                onAlertClick={handleAlertClick}
              />
              <Alerts recentAlerts={disasters} />
            </div>
            <AlertUser radius={1000} />
            <div id="modal-root">
              <Modal />
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default App;
