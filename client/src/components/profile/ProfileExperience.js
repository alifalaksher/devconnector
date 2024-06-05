import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { title, company, location, from, to, current, description },
}) => {
  return (
    <Fragment>
      <div>
        <h3 class="text-dark">{company && <span>{company}</span>}</h3>
        <p>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
          {!to ? "Now" : <Moment format="YYYY/MM/DD">{current}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {title}
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
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
