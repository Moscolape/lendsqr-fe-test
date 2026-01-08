import "./navbar.scss";
import { Bell, ChevronDown, Search } from "lucide-react";
import { ASSETS } from "../../constants/assets";

export default function DashboardNavbar() {
  return (
    <nav className="dashboard-navbar">

      <div className="navbar-left">
        <img src={ASSETS.logo} alt="Lendsqr logo" className="navbar-logo" />
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for anything"
          aria-label="Search"
        />
        <button type="button">
          <Search size={14} />
        </button>
      </div>

      <div className="navbar-right">
        <a href="#" className="docs-link">
          Docs
        </a>

        <button className="notification-btn" aria-label="Notifications">
          <Bell size={26} />
        </button>

        <div className="user-profile">
          <img
            src={ASSETS.avatar}
            alt="User avatar"
            className="user-avatar"
          />
          <span className="username">Adedeji</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </nav>
  );
}
