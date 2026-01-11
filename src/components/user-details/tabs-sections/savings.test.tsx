import { testInfoGroupTab } from "../../../utils/testInfoGroupTab";
import Savings from "./Savings";


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
