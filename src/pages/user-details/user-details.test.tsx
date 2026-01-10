/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetails from "../../pages/user-details/user-details";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock(
  "../../components/user-details/user-details-headers",
  () =>
    ({ activeTab, onTabChange, userId }: any) =>
      (
        <div>
          UserDetailsHeader Component - activeTab: {activeTab}, userId: {userId}
          <button onClick={() => onTabChange("Activity")}>Change Tab</button>
        </div>
      )
);
jest.mock(
  "../../components/user-details/user-details-tab-content",
  () =>
    ({ activeTab }: any) =>
      <div>UserDetailsTabContent Component - activeTab: {activeTab}</div>
);

describe("UserDetails Page", () => {
  test("renders null if no userId param", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/user-details"]}>
        <Routes>
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders UserDetails page with userId param", () => {
    render(
      <MemoryRouter initialEntries={["/user-details/123"]}>
        <Routes>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/UserDetailsHeader Component/)).toBeInTheDocument();
    expect(screen.getByText(/userId: 123/)).toBeInTheDocument();
    expect(
      screen.getByText(/UserDetailsTabContent Component/)
    ).toBeInTheDocument();

    const tabs = screen.getAllByText(/activeTab: General Details/);
    expect(tabs.length).toBe(2);
  });

  test("tab changes when button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/user-details/123"]}>
        <Routes>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByText("Change Tab");
    fireEvent.click(button);

    const tabs = screen.getAllByText(/activeTab: Activity/);
    expect(tabs.length).toBe(2);
  });
});
