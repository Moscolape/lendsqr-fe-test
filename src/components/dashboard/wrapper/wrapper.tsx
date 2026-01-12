import { useRef, useState } from "react";
import DashboardNavbar from "../navbar/navbar";
import DashboardSidebar from "../sidebar/sidebar";
import "./wrapper.scss";

/**
 * DashboardWrapper Component
 * 
 * A layout wrapper component that provides the main dashboard structure including:
 * - Navigation bar with sidebar toggle functionality
 * - Collapsible sidebar for navigation/menu
 * - Main content area for dashboard pages/views
 * 
 * This component manages the sidebar's open/close state and provides references
 * for focus management between sidebar and navbar elements.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 */
export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to manage sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Ref for the menu button to manage focus when sidebar closes
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
        <main className="dashboard-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
