import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../configs/auth", () => ({
  AUTH_CONFIG: {
    email: "lendsqr@fetest.com",
    password: "lendelian001",
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  test("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LOG IN/i })).toBeInTheDocument();
    expect(screen.getByText(/Enter details to login/i)).toBeInTheDocument();
  });

  test("toggles password visibility when show-password clicked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(
      /Password/i
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  test("shows error for invalid login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));

    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("navigates to /users on valid login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "lendsqr@fetest.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "lendelian001" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));

    expect(
      screen.queryByText(/Invalid email or password/i)
    ).not.toBeInTheDocument();
    expect(mockedNavigate).toHaveBeenCalledWith("/users");
  });
});
