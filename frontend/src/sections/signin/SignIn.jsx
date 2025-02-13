import { Link } from "react-router-dom";
import { useState } from "react";
import "./SignIn.css"; // Ensure you have the styles

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in with:", email, password);
    // Add authentication logic here
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/forgot-password" className="forgot-password">
          Forgot Password?
        </Link>

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>

      <p className="register-text">
        Don't have an account yet?{" "}
        <Link to="/register">
          <span className="register-link">Register for free</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
