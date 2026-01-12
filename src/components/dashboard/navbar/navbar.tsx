import { useRef, useState } from "react";
import "./navbar.scss";
import { ASSETS } from "../../../constants/assets";
import { Menu } from "lucide-react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashboardNavbar({
  toggleSidebar,
  menuBtnRef,
}: {
  toggleSidebar: () => void;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (userDropdownOpen) setUserDropdownOpen(false);
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  });

  const handleSearch = () => {
    if (!search.trim()) return;

    if (!location.pathname.startsWith("/users")) {
      navigate(`/users?search=${encodeURIComponent(search)}`);
    } else {
      navigate(`?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <button
          ref={menuBtnRef}
          className="menu-btn"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
        <img src={ASSETS.logo} alt="Lendsqr logo" className="navbar-logo" />
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearch("");
                navigate("/users");
              }}
            >
              ✕
            </button>
          )}
          <button type="button" onClick={handleSearch}>
            <img src={ASSETS.search} alt="search-icon" />
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <a href="#" className="docs-link">
          Docs
        </a>

        <button className="notification-btn" aria-label="Notifications">
          <img src={ASSETS.notification} alt="bell-icon" />
        </button>

        <div
          className="user-profile"
          ref={dropdownRef}
          onClick={() => setUserDropdownOpen((prev) => !prev)}
        >
          <img src={ASSETS.avatar} alt="User avatar" className="user-avatar" />
          <span className="username">Adedeji</span>
          <img
            src={ASSETS.chevronDown}
            alt="chevron-down-icon"
            className={userDropdownOpen ? "rotate" : ""}
          />

          {userDropdownOpen && (
            <div className="user-dropdown">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>

              <div className="mobile-only">
                <a href="#" className="dropdown-item">
                  Docs
                </a>
                <button className="dropdown-item">Notifications</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
