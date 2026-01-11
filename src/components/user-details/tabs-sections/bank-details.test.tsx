import { testInfoGroupTab } from "../../../utils/testInfoGroupTab";
import BankDetails from "./bank-details";


describe("BankDetails Tab", () => {
  testInfoGroupTab({
    component: <BankDetails />,
    expectedGroups: [
      {
        title: "Bank Details",
        items: [
          { label: "Bank Name", value: "Providus Bank" },
          { label: "Account Number", value: "9912345678" },
          { label: "Account Name", value: "Grace Effiom" },
        ],
      },
    ],
  });
});
