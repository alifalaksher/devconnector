import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Alert from "../../components/layouts/Alert"

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  // if user is authenticated redirect to dashboard
  if (isAuth) return <Navigate to="/dashboard" />;
  return (
    <>
    <Alert />
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProp, { login })(Login);
