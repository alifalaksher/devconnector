
import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
} from "../actions/types";
const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};
/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...state, likes: payload.likes } : post
        ),
      };
    default:
      return state;
  }
}
