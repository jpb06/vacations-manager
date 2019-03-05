import { ActionTypes } from '../actions/actionTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      console.log("LOGIN_REQUEST");
      return {
        loggingIn: true,
        user: action.user
      };
    case ActionTypes.LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS");
      return {
        loggedIn: true,
        user: action.user
      };
    case ActionTypes.LOGIN_FAILURE:
      console.log("LOGIN_FAILURE");
      return {};
    case ActionTypes.LOGOUT:
    console.log("LOGOUT");
      return {};
    default:
      return state
  }
}