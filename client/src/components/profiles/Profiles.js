import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import ProfilesItem from "./ProfilesItem";

function Profiles({ getProfiles, profile: { profiles, loading } }) {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 class="large text-primary">Developers</h1>
          <p class="lead">
            <i class="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div class="profiles">
               
          {console.log(profiles.profile)}
            {profiles.profile?.length > 0 ? (
              profiles.profile.map((profile) => (
                <ProfilesItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No Profiles Found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
