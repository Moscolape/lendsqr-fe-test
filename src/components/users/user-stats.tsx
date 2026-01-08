import { ASSETS } from "../../constants/assets";
import StatsCards, { type StatItem } from "./stats-card";

const stats: StatItem[] = [
  {
    id: "users",
    label: "Users",
    value: "2,453",
    icon: <img src={ASSETS.userstat1} alt="users-icon" />,
    variant: "purple",
  },
  {
    id: "active-users",
    label: "Active Users",
    value: "2,453",
    icon: <img src={ASSETS.userstat2} alt="active-users-icon" />,
    variant: "blue",
  },
  {
    id: "loans",
    label: "Users with Loans",
    value: "12,453",
    icon: <img src={ASSETS.userstat3} alt="users-with-loans-icon" />,
    variant: "orange",
  },
  {
    id: "savings",
    label: "Users with Savings",
    value: "102,453",
    icon: <img src={ASSETS.userstat4} alt="users-with-savings-icon" />,
    variant: "pink",
  },
];

export default function UserStats() {
  return <StatsCards stats={stats} />;
}
