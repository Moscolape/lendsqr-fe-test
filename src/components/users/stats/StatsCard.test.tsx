import { render, screen } from "@testing-library/react";
import StatsCards, { type StatItem } from "./StatsCard";
import { ChevronUp } from "lucide-react";

describe("StatsCards Component", () => {
  const stats: StatItem[] = [
    {
      id: "1",
      label: "Revenue",
      value: 5000,
      icon: <ChevronUp />,
      variant: "blue",
    },
    {
      id: "2",
      label: "Users",
      value: 120,
      icon: <ChevronUp />,
      variant: "orange",
    },
  ];

  test("renders all stats cards with correct content", () => {
    render(<StatsCards stats={stats} />);

    stats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(String(stat.value))).toBeInTheDocument();

      const cardIcon = screen.getByText((_content, element) => {
        return element?.classList.contains(stat.variant || "purple") ?? false;
      });
      expect(cardIcon).toBeInTheDocument();
    });
  });

  test("renders default variant if none provided", () => {
    const statsWithNoVariant: StatItem[] = [
      { id: "3", label: "Orders", value: 50, icon: <ChevronUp /> },
    ];
    render(<StatsCards stats={statsWithNoVariant} />);

    const cardIcon = screen.getByText((_content, element) => {
      return element?.classList.contains("purple") ?? false;
    });
    expect(cardIcon).toBeInTheDocument();
  });

  test("does not render stats not provided (negative case)", () => {
    render(<StatsCards stats={stats} />);
    expect(screen.queryByText("Nonexistent Stat")).not.toBeInTheDocument();
  });

  test("renders numeric and string values correctly", () => {
    const mixedStats: StatItem[] = [
      { id: "4", label: "Score", value: "A+", icon: <ChevronUp /> },
    ];
    render(<StatsCards stats={mixedStats} />);
    expect(screen.getByText("A+")).toBeInTheDocument();
  });
});
