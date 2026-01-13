import { testInfoGroupTab } from "../../../utils/test-helpers/testInfoGroupTab";
import AppAndSystem from "./app-system";

/**
 * Test suite for the AppAndSystem tab
 *
 * Verifies that the tab renders the correct
 * information group with expected labels and values.
 */
describe("AppAndSystem Tab", () => {
  testInfoGroupTab({
    // Component under test
    component: <AppAndSystem />,

    // Expected InfoGroup configuration
    expectedGroups: [
      {
        title: "App and System",
        items: [
          { label: "Last Login", value: "8 Jan 2026, 10:45 AM" },
          { label: "Device", value: "Chrome / Windows" },
          { label: "Account Status", value: "Active" },
        ],
      },
    ],
  });
});
