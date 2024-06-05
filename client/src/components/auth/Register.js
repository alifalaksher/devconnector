import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import {set_alert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from "prop-types";


const Register = ({ set_alert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      set_alert("Password does not match", "danger");
    } else {
      register({name, email, password})    
    }
  };
  // if user is authenticated redirect to dashboard
  if (isAuth) return <Navigate to ="/dashboard" />

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          
            onChange={(e) => onChange(e)}
            value={confirmPassword}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  set_alert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};
const mapStateToProp = state =>({
  isAuth: state.auth.isAuth 
 });

export default connect(mapStateToProp,{ set_alert, register})(Register);