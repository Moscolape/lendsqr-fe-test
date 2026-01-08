import DashboardNavbar from "./navbar";
import DashboardSidebar from "./sidebar";
import "./wrapper.scss";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-wrapper">
      <DashboardNavbar />
      <div className="main">
        <DashboardSidebar />
        <main className="dashboard-main-content">{children}</main>
      </div>
    </div>
  );
}