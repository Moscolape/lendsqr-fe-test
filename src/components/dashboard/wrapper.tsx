import { useState } from "react";
import DashboardNavbar from "./navbar";
import DashboardSidebar from "./sidebar";
import "./wrapper.scss";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
  return (
    <div className="dashboard-wrapper">
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(prev => !prev)}/>
      <div className="main">
        <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <main className="dashboard-main-content">{children}</main>
      </div>
    </div>
  );
}