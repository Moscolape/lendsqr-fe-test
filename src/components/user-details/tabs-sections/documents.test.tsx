import { render, screen, fireEvent } from "@testing-library/react";
import Documents from "./documents";

describe("Documents Tab", () => {
  beforeEach(() => {
    render(<Documents />);
  });

  test("renders the Documents section title", () => {
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  test("renders all document items with their labels", () => {
    const labels = ["Proof of Identity", "Utility Bill", "Employment Letter"];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders all View buttons and they are clickable", () => {
    const buttons = screen.getAllByText("View");
    expect(buttons.length).toBe(3);

    buttons.forEach((btn) => {
      fireEvent.click(btn);
      expect(btn).toBeEnabled();
    });
  });

  test("does not render non-existent document labels or buttons", () => {
    expect(screen.queryByText("Fake Document")).not.toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
  });
});
