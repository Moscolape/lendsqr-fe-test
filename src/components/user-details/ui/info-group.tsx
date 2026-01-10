import "../tabs.scss";

export const InfoGroup = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <section className="info-group">
    <h4>{title}</h4>

    <div className="info-grid">
      {items.map((item) => (
        <div key={item.label} className="info-item">
          <span className="label">{item.label}</span>
          <span className="value">{item.value}</span>
        </div>
      ))}
    </div>
  </section>
);
