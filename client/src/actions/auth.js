import setAuthToken from "../utils/setAuthToken";
import { set_alert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  //get token from local storage
  const token = localStorage.getItem("token");
  if (!token) return dispatch({ type: AUTH_ERROR });
  if (localStorage.token) setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password }); //convert data to string format

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(set_alert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  // console.log(body) //convert data to string format

  try {
    const res = await axios.post("/api/auth", body, config);
    // console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {

    // console.log(err)
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
    dispatch(loadUser());
    dispatch(set_alert('Invalid Credentials', 'danger'))
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
