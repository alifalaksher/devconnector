import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
import { set_alert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    // console.log(res, "api res");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.res.data.error;
      if (!errors) {
          errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
      }
    dispatch({ type: PROFILE_ERROR, payload: { msg: "There is an Error" } });
    dispatch({ type: CLEAR_PROFILE });
  }
};

//Get all Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE, payload: { msg: "There is an Error" } });
  try {
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: "There is an Error" } });
  }
};

//GetProfilesByID
export const getProfilesById = userId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: "There is an Error" } });
  }
};


//Get Github Id
export const getGithub = username => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: "There is an Error" } });
  }
};

//* Create or update a profile for the authenticated user
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    //* API request to either add or update a profile
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);
      console.log(res);
      dispatch({ type: GET_PROFILE, payload: res.data });
      //* Redirect user after successful creation of profile
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.res.data.error;
      if (!errors) {
        errors.forEach((error) => dispatch(set_alert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data.statusText,
      });
    }
  };

//add Experience

//* Create or update a profile for the authenticated user
export const addExp =
  (formData, history, edit = false) =>
  async (dispatch) => {
    //* API request to either add or update a profile
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/exp", formData, config);
      // console.log(res);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(set_alert("Experience Added", "success"));
      //* Redirect user after successful creation of profile
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.payload,
      });
    }
  };
//add Education

export const addEd =
  (formData, history, edit = false) =>
  async (dispatch) => {
    //* API request to either add or update a profile
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/ed", formData, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      //* Redirect user after successful creation of profile
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.res.data.error
      if (!errors) {
          errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data.statusText,
      });
    }
  };

//add Education

export const delEdu = (id) => async (dispatch) => {
  //* API request to either add or update a profile
  try {
    const res = await axios.delete(`/api/profile/ed/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(set_alert("Education Deleted", "success"));
  } catch (err) {
    const errors = err.res.data.error
    if (!errors) {
        errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: err.payload,
    });
  }
};
//add Education

export const delExp = (id) => async (dispatch) => {
  //* API request to either add or update a profile
  try {
    const res = await axios.delete(`/api/profile/exp/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(set_alert("Experience Deleted", "success"));
  } catch (err) {
      const errors = err.res.data.error
    if (!errors) {
        errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: err.payload,
    });
  }
};
