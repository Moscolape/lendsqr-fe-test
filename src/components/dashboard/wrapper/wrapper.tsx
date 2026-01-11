import { useRef, useState } from "react";
import DashboardNavbar from "../navbar/Navbar";
import DashboardSidebar from "../sidebar/Sidebar";
import "./Wrapper.scss";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="dashboard-wrapper">
      <DashboardNavbar
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        menuBtnRef={menuBtnRef}
      />

      <div className="main">
        <DashboardSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuBtnRef={menuBtnRef}
        />

        <main className="dashboard-main-content">{children}</main>
      </div>
    </div>
  );
}
