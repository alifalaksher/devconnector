import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { connect } from "react-redux";
import { getProfilesById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";

const ProfileByID = ({
  getProfilesById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfilesById(match?.params?.id);
  }, [getProfilesById, match.params.id]);
  return (
    <Fragment>
      {profile !== null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuth &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <h4>NO Experience Found</h4>
                </Fragment>
              )}
            </div>
            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileExperience key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <h4>NO Education Found</h4>
                </Fragment>
              )}

              {profile.githubUsername && <ProfileGithub username={profile.githubUsername} />}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileByID.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfilesById })(ProfileByID);
