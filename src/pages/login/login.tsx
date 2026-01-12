import { useState, type FormEvent, type ChangeEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { ASSETS } from "../../constants/assets";
import { AUTH_CONFIG } from "../../configs/auth";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function Login(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  usePageTitle("Login | Lendsqr");

  const togglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  const dummyEmail = AUTH_CONFIG.email;
  const dummyPassword = AUTH_CONFIG.password;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email === dummyEmail && password === dummyPassword) {
      setError("");
      navigate("/users");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

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
