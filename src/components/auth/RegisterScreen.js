import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form>
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          className="auth__input"
          name="password2"
          type="password"
          placeholder="Confirm password"
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
