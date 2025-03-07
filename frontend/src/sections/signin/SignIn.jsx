/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import "./SignIn.css"; // Ensure you have the styles

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* const user = useAuthContext(); */

  const navigate = useNavigate();

  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    const user = localStorage.getItem('user');

    if (user) {
      navigate('/')
    }

  };

  return (
    <section className="sign-in-container">
      <section className="sign-in">
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

          <button disabled={isLoading} type="submit" className="signin-button">
            Sign In
          </button>
          {error && <div className="error">{error}</div>}
        </form>

        <p className="register-text">
          Don't have an account yet?{" "}
          <Link to="/register">
            <span className="register-link">Register for free</span>
          </Link>
        </p>
      </section>
    </section>
  );
};

export default SignIn;
