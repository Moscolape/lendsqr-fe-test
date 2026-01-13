import React from "react";
import "./stats-card.scss";

// Interface for a single stat card
export interface StatItem {
  id: string; // unique key for React rendering
  label: string; // description of the stat
  value: number | string; // numeric or string value
  icon: React.ReactNode; // icon component
  variant?: "purple" | "blue" | "orange" | "pink"; // optional color variant
}

interface StatsCardsProps {
  stats: StatItem[]; // array of stat items to render
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="stats-cards">
      {stats.map((item) => (
        <div key={item.id} className="stats-card">
          {/* Apply variant class; fallback to 'purple' */}
          <div className={`icon ${item.variant ?? "purple"}`}>{item.icon}</div>

          <div className="content">
            <p className="label">{item.label}</p>
            <h3 className="value">{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;