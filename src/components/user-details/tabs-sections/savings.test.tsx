import { testInfoGroupTab } from "../../../utils/test-helpers/testInfoGroupTab";
import Savings from "./savings";

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
