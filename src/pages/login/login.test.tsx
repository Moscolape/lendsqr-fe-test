import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

// Mock navigate function to test routing
const mockedNavigate = jest.fn();

// Mock react-router-dom's useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock authentication config to provide dummy login credentials
jest.mock("../../configs/auth", () => ({
  AUTH_CONFIG: {
    email: "lendsqr@fetest.com",
    password: "lendelian001",
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    mockedNavigate.mockReset(); // Reset navigation mock before each test
  });

  test("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check that email and password inputs exist
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    // Check that the login button exists
    expect(screen.getByRole("button", { name: /LOG IN/i })).toBeInTheDocument();

    // Check that the login instruction text exists
    expect(screen.getByText(/Enter details to login/i)).toBeInTheDocument();
  });

  test("toggles password visibility when show-password clicked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Password/i) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    // Initially, password input should be of type password
    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text"); // Should toggle to text

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password"); // Toggle back
  });

  test("shows error for invalid login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Enter wrong email and password
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));

    // Expect error message and no navigation
    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("navigates to /users on valid login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Enter correct credentials
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "lendsqr@fetest.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "lendelian001" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOG IN/i }));

    // No error should be shown
    expect(screen.queryByText(/Invalid email or password/i)).not.toBeInTheDocument();

    // Navigate should be called with /users
    expect(mockedNavigate).toHaveBeenCalledWith("/users");
  });
});
