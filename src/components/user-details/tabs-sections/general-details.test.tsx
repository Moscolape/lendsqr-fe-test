/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { createMockUser } from "../../../utils/test-helpers/mockUserData";
import GeneralDetails from "./general-details";

/**
 * Mock the InfoGroup component to isolate tests
 * and focus only on rendered content and structure.
 */
jest.mock("../../../components/user-details/ui/info-group", () => ({
  __esModule: true,
  InfoGroup: ({ title, items }: any) => (
    <div>
      <h3>{title}</h3>
      <div>
        {items.map((item: any, index: number) => (
          <div key={index}>
            <span>{item.label}</span>: <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}));

/**
 * Test suite for the GeneralDetails tab
 *
 * Validates section rendering, correct data display,
 * and ensures invalid data is not shown.
 */
describe("GeneralDetails Tab", () => {
  const mockUser = createMockUser();

  test("renders all section titles", () => {
    render(<GeneralDetails userData={mockUser} />);

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Education and Employment")).toBeInTheDocument();
    expect(screen.getByText("Socials")).toBeInTheDocument();
    expect(screen.getByText("Guarantor")).toBeInTheDocument();
  });

  test("renders user data - checks multiple occurrences", () => {
    render(<GeneralDetails userData={mockUser} />);

    // Validate repeated or reused values across sections
    expect(screen.getAllByText("Grace Effiom").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("07060780922").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("grace@gmail.com").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Female").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Single").length).toBeGreaterThanOrEqual(1);
  });

  test("renders specific data in correct context", () => {
    render(<GeneralDetails userData={mockUser} />);

    // Narrow assertions to the Personal Information section
    const personalInfoSection = screen
      .getByText("Personal Information")
      .closest("div");

    expect(personalInfoSection).toHaveTextContent("Grace Effiom");
    expect(personalInfoSection).toHaveTextContent("07060780922");
    expect(personalInfoSection).toHaveTextContent("grace@gmail.com");
    expect(personalInfoSection).toHaveTextContent("Female");
    expect(personalInfoSection).toHaveTextContent("Single");
  });

  test("does not render incorrect data", () => {
    render(<GeneralDetails userData={mockUser} />);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Wrong Email")).not.toBeInTheDocument();
    expect(screen.queryByText("Male")).not.toBeInTheDocument();
  });
});
