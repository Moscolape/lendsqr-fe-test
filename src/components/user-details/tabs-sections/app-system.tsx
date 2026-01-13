import "../tabs.scss";
import { InfoGroup } from "../ui/info-group";

/**
 * AppAndSystem
 *
 * Displays static system-related information
 * such as login time, device, and account status.
 */
const AppAndSystem = () => {
  return (
    // Wrapper card for the tab content
    <div className="tab-card">
      <InfoGroup
        title="App and System"
        items={[
          { label: "Last Login", value: "8 Jan 2026, 10:45 AM" },
          { label: "Device", value: "Chrome / Windows" },
          { label: "Account Status", value: "Active" },
        ]}
      />
    </div>
  );
};

export default AppAndSystem;
