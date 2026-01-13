import { useState, useEffect } from "react";
import { ASSETS } from "../../../constants/assets";
import StatsCards, { type StatItem } from "../stats/stats-card";
import mockapi from "../../../services/mockApi";
import { toast } from "react-toastify";

// Placeholder stats to display while loading real data
const placeholderStats: StatItem[] = [
  {
    id: "users",
    label: "Users",
    value: "2453",
    icon: <img src={ASSETS.userstat1} alt="users-icon" />,
    variant: "purple",
  },
  {
    id: "active-users",
    label: "Active Users",
    value: "2453",
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
  const [stats, setStats] = useState<StatItem[]>(placeholderStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRealStats();

    // Show toast if there is an error
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const loadRealStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const formattedStats = await mockapi.getFormattedStats();

      // Map API results to StatItem array
      const realStats: StatItem[] = [
        {
          id: "users",
          label: "Users",
          value: formattedStats.totalUsers,
          icon: <img src={ASSETS.userstat1} alt="users-icon" />,
          variant: "purple",
        },
        {
          id: "active-users",
          label: "Active Users",
          value: formattedStats.activeUsers,
          icon: <img src={ASSETS.userstat2} alt="active-users-icon" />,
          variant: "blue",
        },
        {
          id: "loans",
          label: "Users with Loans",
          value: formattedStats.usersWithLoans,
          icon: <img src={ASSETS.userstat3} alt="users-with-loans-icon" />,
          variant: "orange",
        },
        {
          id: "savings",
          label: "Users with Savings",
          value: formattedStats.usersWithSavings,
          icon: <img src={ASSETS.userstat4} alt="users-with-savings-icon" />,
          variant: "pink",
        },
      ];

      setStats(realStats);
    } catch (err) {
      console.error("Failed to load stats:", err);
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  // While loading, show placeholder stats
  if (loading) {
    return <StatsCards stats={placeholderStats} />;
  }

  return <StatsCards stats={stats} />;
}
