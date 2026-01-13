import { useState, type FormEvent, type ChangeEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { ASSETS } from "../../constants/assets";
import { AUTH_CONFIG } from "../../configs/auth";
import { usePageTitle } from "../../hooks/usePageTitle";

/**
 * Login component renders the login page with email/password fields,
 * password visibility toggle, and dummy authentication.
 */
export default function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Set the page title using custom hook
  usePageTitle("Login | Lendsqr");

  // Toggle password input visibility
  const togglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  // Dummy credentials from config
  const dummyEmail = AUTH_CONFIG.email;
  const dummyPassword = AUTH_CONFIG.password;

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email === dummyEmail && password === dummyPassword) {
      setError("");
      navigate("/users"); // Navigate to users page on successful login
    } else {
      setError("Invalid email or password"); // Show error message
    }
  };

  // Update state when email input changes
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  // Update state when password input changes
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={ASSETS.logo} alt="Logo" className="logo" />
        <img src={ASSETS.pabloLogin} alt="Pablo png" className="pablo-image" />
      </div>

      <div className="login-container">
        <img src={ASSETS.logo} alt="Logo" className="logo" />
        <div className="login-form">
          <h1 className="login-header">Welcome!</h1>
          <p className="login-instruction">Enter details to login.</p>

          {/* Show error if login fails */}
          {error && <span className="error">{error}</span>}

          <form className="login-form-fields" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />

              {/* Password visibility toggle */}
              <span
                className="show-password"
                onClick={togglePassword}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <a href="#" className="forgot-password">
              FORGOT PASSWORD?
            </a>

            <button type="submit" className="login-btn">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
