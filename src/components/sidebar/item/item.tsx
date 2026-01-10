import "./item.scss";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div className={`sidebar-item ${active ? "active" : ""}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
