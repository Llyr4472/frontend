import './../global.css'  

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

  const Navbar: React.FC<LeftSidebarProps> = ({
    onSearch,
    onFilter,
    onAlertClick,
  }) => {
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item hover-effect">
                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item  hover-effect">
                <a className="nav-link text-light" href="#">
                  Alerts
                </a>
              </li>
              <li className="nav-item dropdown  hover-effect">
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
                      className="dropdown-item text-light hover-effect rounded-5"
                      href="#"
                    >
                      Earthquake
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-light hover-effect rounded-5"
                      href="#"
                    >
                      Flood
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-light hover-effect rounded-5"
                      href="#"
                    >
                      Hurricane
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-light hover-effect rounded-5"
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
                      className="dropdown-item text-light hover-effect rounded-5"
                      href="#"
                    >
                      All Disasters
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item  hover-effect">
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
            <form className="d-flex" role="search">
              <input
              className="form-control me-2 bg-light text-dark border-0 rounded-pill hover-effect search-bar"
                type="search"
                placeholder="Search alerts..."
                aria-label="Search"
                style={{ fontFamily: "monospace", width: "250px" }}
              />
              <button
                className="btn rounded-pill hover-effect"
                type="submit"
                onClick={() => onSearch("")}
                style={{
                  backgroundColor: "rgba(77, 77, 255, 0.5)",
                  color: "#4d4dff",
                  fontFamily: "monospace",
                  transition: "transform 0.1s",
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );

  }
  export default Navbar