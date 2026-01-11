import { render, screen } from "@testing-library/react";
import Loans from "./Loans";

describe("Loans Tab", () => {
  beforeEach(() => {
    render(<Loans />);
  });

  test("renders the Loans section title", () => {
    expect(screen.getByText("Loans")).toBeInTheDocument();
  });

  test("renders all table headers", () => {
    const headers = ["Loan Type", "Amount", "Status", "Repayment"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("renders all table row values correctly", () => {
    const values = ["Personal Loan", "₦50,000", "Active", "₦10,000/month"];
    values.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test("does not render incorrect table headers or values (negative case)", () => {
    expect(screen.queryByText("Fake Loan")).not.toBeInTheDocument();
    expect(screen.queryByText("₦999,999")).not.toBeInTheDocument();
    expect(screen.queryByText("Pending")).not.toBeInTheDocument();
  });
});
