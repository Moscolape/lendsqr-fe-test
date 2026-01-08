import DashboardNavbar from "./navbar";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-wrapper">
      <DashboardNavbar />
      {children}
    </div>
  );
}