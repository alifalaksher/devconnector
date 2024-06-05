import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  education: {
    institute,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  },
}) => {
  return (
    <Fragment>
      <div>
        <h3>{institute && { institute }}</h3>
        <p>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
          {!to ? "Now" : <Moment format="YYYY/MM/DD">{current}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldOfStudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileExperience;
