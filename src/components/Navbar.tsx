import "./../global.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Alert {
  type: string;
  location: string;
  time: string;
}

interface LeftSidebarProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (type: string) => void;
  onAlertClick: (alert: Alert) => void;
}

const Navbar: React.FC<LeftSidebarProps> = ({ onSearch }) => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top px-4 my-3 mx-3 rounded-pill"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "monospace",
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold hover-effect"
          href="#"
          style={{ color: "#4d4dff" }}
        >
          Disalert
        </a>
        <button
          className="navbar-toggler hover-effect"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item hover-effect">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item hover-effect">
              <a className="nav-link text-light" href="#">
                Alerts
              </a>
            </li>
            <li className="nav-item dropdown hover-effect">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Disaster Types
              </a>
              <ul
                className="dropdown-menu rounded-5"
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(10px)",
                  fontFamily: "monospace",
                }}
              >
                <li>
                  <a
                    className="dropdown-item text-light rounded-5 highlighted-hover"
                    href="#"
                  >
                    Earthquake
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-light highlighted-hover rounded-5"
                    href="#"
                  >
                    Flood
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-light highlighted-hover rounded-5"
                    href="#"
                  >
                    Hurricane
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-light highlighted-hover rounded-5"
                    href="#"
                  >
                    Wildfire
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item text-light highlighted-hover rounded-5"
                    href="#"
                  >
                    All Disasters
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item hover-effect">
              <a
                className="nav-link text-light"
                href="https://www.redcross.org/get-help.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Emergency Resources
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <form className="d-flex me-2" role="search">
              <input
                className="form-control me-2 border-0 rounded-pill hover-effect search-bar"
                type="search"
                placeholder="Search alerts..."
                aria-label="Search"
                style={{ fontFamily: "monospace", width: "250px"}}
              />
              <button
                className="btn btn-outline-light rounded-pill hover-effect  "
                type="submit"
                onClick={() => {
                  const searchInput = document.querySelector(
                    'input[type="search"]'
                  );
                  if (searchInput instanceof HTMLInputElement) {
                    onSearch(searchInput.value);
                  }
                }}
              >
                Search
              </button>
            </form>
          </div>
          <Link to="/login" className="hover-effect ms-3">
            <AccountCircleIcon
              style={{
                width: "45px",
                height: "45px",
                color: "#9c9ce4",
              }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;