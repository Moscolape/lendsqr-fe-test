import "../tabs.scss";

/**
 * InfoGroup
 *
 * Reusable UI component for displaying grouped
 * label–value information in a grid layout.
 */
export const InfoGroup = ({
  title,
  items,
}: {
  title: string;
  items?: { label: string; value: string }[];
}) => (
  <section className="info-group">
    {/* Section title */}
    <h4>{title}</h4>

    {/* Grid container for label–value pairs */}
    <div className="info-grid">
      {items?.map((item) => (
        <div key={`${item.label}-${item.value}`} className="info-item">
          <span className="label">{item.label}</span>
          <span className="value">{item.value}</span>
        </div>
      ))}
    </div>
  </section>
);
