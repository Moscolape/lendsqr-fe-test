import { testInfoGroupTab } from "../../../utils/testInfoGroupTab";
import AppAndSystem from "./app-system";


describe("AppAndSystem Tab", () => {
  testInfoGroupTab({
    component: <AppAndSystem />,
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
