import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register bg-white text-black p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="sign-in-text">
          Already have an account?&nbsp;
          <Link to="/signin" className="sign-in-link">
            Sign In
          </Link>
        </p>
        <p className="sign-in-text">
          <Link to="/" className="sign-in-link">
            Go back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
