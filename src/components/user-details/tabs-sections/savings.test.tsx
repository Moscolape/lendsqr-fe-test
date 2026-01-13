import { testInfoGroupTab } from "../../../utils/test-helpers/testInfoGroupTab";
import Savings from "./savings";

/**
 * Test suite for the Savings tab
 *
 * Uses a shared test helper to validate that
 * the InfoGroup component renders correctly
 * with expected titles and values.
 */
describe("Savings Tab", () => {
  testInfoGroupTab({
    component: <Savings />,
    expectedGroups: [
      {
        title: "Savings",
        items: [
          { label: "Savings Balance", value: "₦120,000" },
          { label: "Savings Plan", value: "Monthly" },
          { label: "Interest Rate", value: "5%" },
        ],
      },
    ],
  });
});
