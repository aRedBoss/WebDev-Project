import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register">
        <h2>Register</h2>
        <form>
          <div className="register-label-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-in-text">
          Already have an account?&nbsp;
          <Link to="/signin" className="register-in-link">
            Sign In
          </Link>
        </p>
        <p className="register-in-text">
          <Link to="/" className="register-in-link">
            Go back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
