import React from "react";
import "./stats-card.scss";

export interface StatItem {
  id: string;
  label: string;
  value: number | string;
  icon: React.ReactNode;
  variant?: "purple" | "blue" | "orange" | "pink";
}

interface StatsCardsProps {
  stats: StatItem[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="stats-cards">
      {stats.map((item) => (
        <div key={item.id} className="stats-card">
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
