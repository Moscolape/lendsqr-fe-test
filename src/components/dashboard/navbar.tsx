import "./navbar.scss";
import { ASSETS } from "../../constants/assets";
import { Menu } from "lucide-react";

export default function DashboardNavbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={22} />
        </button>
        <img src={ASSETS.logo} alt="Lendsqr logo" className="navbar-logo" />
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for anything"
            aria-label="Search"
          />
          <button type="button">
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

        <div className="user-profile">
          <img src={ASSETS.avatar} alt="User avatar" className="user-avatar" />
          <span className="username">Adedeji</span>
          <img src={ASSETS.chevronDown} alt="chevron-down-icon" />
        </div>
      </div>
    </nav>
  );
}
