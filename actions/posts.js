import axios from "axios";
import { ADD_POST, DELETE_POST, GET_POSTS, POSTS_ERROR, UPDATE_LIKES, GET_POST } from "./types";
import { set_alert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Getting Post Error" } });
  }
};

// Get post
export const getPost = id => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Getting Post Error" } });
  }
};

//like the post

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Adding Like Error" } });
  }
};

//Unlike the post

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Removing Error" } });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
    // dispatch to show alert
    dispatch(set_alert("Post Removed", "success"));
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Deleting Post Error" } });
  }
};

//Ad Post
export const addPost = (formData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/jason" } };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    // dispatch to show alert
    dispatch(set_alert("Added Post", "success"));
  } catch (err) {
    dispatch({ type: POSTS_ERROR, payload: { msg: "Adding Post Error" } });
  }
};
