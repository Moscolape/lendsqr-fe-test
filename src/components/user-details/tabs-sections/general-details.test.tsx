/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { createMockUser } from "../../../utils/test-helpers/mockUserData";
import GeneralDetails from "./general-details";

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

    const graceEffiomElements = screen.getAllByText("Grace Effiom");
    expect(graceEffiomElements.length).toBeGreaterThanOrEqual(1);
    expect(graceEffiomElements[0]).toBeInTheDocument();

    const phoneElements = screen.getAllByText("07060780922");
    expect(phoneElements.length).toBeGreaterThanOrEqual(1);
    expect(phoneElements[0]).toBeInTheDocument();

    const emailElements = screen.getAllByText("grace@gmail.com");
    expect(emailElements.length).toBeGreaterThanOrEqual(1);
    expect(emailElements[0]).toBeInTheDocument();

    const genderElements = screen.getAllByText("Female");
    expect(genderElements.length).toBeGreaterThanOrEqual(1);
    expect(genderElements[0]).toBeInTheDocument();

    const statusElements = screen.getAllByText("Single");
    expect(statusElements.length).toBeGreaterThanOrEqual(1);
    expect(statusElements[0]).toBeInTheDocument();
  });

  test("renders specific data in correct context", () => {
    render(<GeneralDetails userData={mockUser} />);

    const personalInfoSection = screen.getByText("Personal Information").closest('div');
    
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