import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
      case GET_PROFILES:
        return{
          ...state,
          profiles: action.payload,
          loading: false
        }
        case GET_REPOS:
          return{
            ...state,
            repos: action.payload,
            loading: false,
          }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
