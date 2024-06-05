import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import DashBoardAction from "./DashBoardAction";
import Experiences from "./Experiences";
import Educations from "./Educations";


const Dashboard = ({
  getCurrentProfile,
  auth:{user},
  profile:{profile, loading}
}) => {
  useEffect(() => {
    getCurrentProfile();
  },[getCurrentProfile]);


  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
     
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user &&  user.user.name?.split(" ")?.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') }
      </p>
      {profile !== null ? (
        <Fragment>
          <DashBoardAction />
       <Experiences experiences={profile?.profile?.experience} />
       <Educations education={profile?.profile?.education} />
         
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary ml-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
