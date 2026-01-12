import "./section.scss";

/**
 * SidebarSection
 *
 * A simple layout component used to group related
 * sidebar items under a common title.
 *
 * @param title    Section heading displayed above the items
 * @param children Sidebar items rendered within the section
 */
export default function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Wrapper for a sidebar group
    <div className="sidebar-section">
      {/* Section heading */}
      <p className="section-title">{title}</p>

      {/* Sidebar items belonging to this section */}
      {children}
    </div>
  );
}
