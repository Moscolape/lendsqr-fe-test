import "./item.scss";

/**
 * Props definition for the SidebarItem component
 */
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

/**
 * SidebarItem
 *
 * A presentational component responsible for rendering
 * a single navigation item inside the dashboard sidebar.
 *
 * @param icon   React node rendered as the item's icon
 * @param label  Text shown next to the icon
 * @param active Determines whether the item is visually highlighted
 */

export default function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    /**
     * Root container for the sidebar item
     */
    <div className={`sidebar-item ${active ? "active" : ""}`}>
      {/* Icon container (SVG / image / icon component) */}
      {icon}

      {/* Text label for the sidebar item */}
      <span>{label}</span>
    </div>
  );
}
