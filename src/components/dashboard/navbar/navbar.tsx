import { useRef, useState } from "react";
import "./navbar.scss";
import { ASSETS } from "../../../constants/assets";
import { Menu } from "lucide-react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * DashboardNavbar
 *
 * Global navigation bar shown across dashboard pages.
 * Responsibilities:
 * - Toggle sidebar visibility
 * - Provide global search (redirects to Users page)
 * - Display user profile dropdown
 */
export default function DashboardNavbar({
  toggleSidebar,
  menuBtnRef,
}: {
  toggleSidebar: () => void;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  /**
   * Controls visibility of the user profile dropdown
   */
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    if (userDropdownOpen) setUserDropdownOpen(false);
  });

  /**
   * React Router navigation utilities
   */
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Search input state.
   * Initialized from the URL query parameter (?search=...)
   * so search persists across refreshes and navigation.
   */
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  });

  /**
   * Handles search submission.
   * - Redirects to /users if not already there
   * - Updates query param if already on /users
   */
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
        {/* Sidebar toggle button */}
        <button
          ref={menuBtnRef}
          className="menu-btn"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>

        {/* Application logo */}
        <img src={ASSETS.logo} alt="Lendsqr logo" className="navbar-logo" />

        {/* Global search input */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Clear search button (only visible when search has value) */}
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

          {/* Explicit search button */}
          <button type="button" onClick={handleSearch}>
            <img src={ASSETS.search} alt="search-icon" />
          </button>
        </div>
      </div>

      <div className="navbar-right">
        {/* Documentation link */}
        <a href="#" className="docs-link">
          Docs
        </a>

        {/* Notifications icon */}
        <button className="notification-btn" aria-label="Notifications">
          <img src={ASSETS.notification} alt="bell-icon" />
        </button>

        {/* User profile + dropdown */}
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

          {/* User dropdown menu */}
          {userDropdownOpen && (
            <div className="user-dropdown">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>

              {/* Mobile-only links */}
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
