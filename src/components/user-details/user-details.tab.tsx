import "./user-details.scss";

interface Props {
  // Currently selected tab
  activeTab: string;

  // Callback triggered when a tab is clicked
  onChange: (tab: string) => void;
}

// Centralised list of tabs for consistent rendering and testing
const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

// Stateless tab navigation component
const UserTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          // Apply active class for visual feedback
          className={tab === activeTab ? "active" : ""}
          // Delegate tab change handling to parent
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default UserTabs;
