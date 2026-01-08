import "./section.scss"

export default function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sidebar-section">
      <p className="section-title">{title}</p>
      {children}
    </div>
  );
}
