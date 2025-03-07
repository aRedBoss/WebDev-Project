/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useSignup } from '../../hooks/useSignup'

import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(username, email, phoneNumber, password)

    const user = localStorage.getItem('user');

    if (user) {
      navigate('/')
    }
  }



  return (
    <div className="register-container">
      <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-label-container">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              id="username"
              name="username"
              placeholder="username"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="phone">Phone Number</label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
            />
          </div>
          <div className="register-label-container">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
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
          <button disabled={isLoading} type="submit" className="register-button">
            Register
          </button>
          {error && <div className="error">{error}</div>}
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
