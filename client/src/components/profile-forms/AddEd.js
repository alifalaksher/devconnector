import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEd } from "../../actions/profile";

function AddEd({ addEd, history}) {
  const [formData, setFormData] = useState({
    school: "",
    fieldOfStudy: "",
    degree: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });
  const [toDateDisable, toggleDisable] = useState(false);
  // destructuring props
  const { school,degree, fieldOfStudy, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 const SubmitForm = (e)=>{
    e.preventDefault();
    addEd(formData, history)
 }
  return (
    <Fragment>
     <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootCamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => SubmitForm(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or BootCamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldOfStudy" value={fieldOfStudy}
            onChange={(e) => onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=> onChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current"  checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDateDisable);
              }} />{" "} Current School or BootCamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled ={toDateDisable ? 'disable' : ''}value={to} onChange={(e)=>onChange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={e=> onChange(e)}
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
}

AddEd.propTypes = {
    addEd: PropTypes.func.isRequired
};

export default connect(null,{addEd})(AddEd);
