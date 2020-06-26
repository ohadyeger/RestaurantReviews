import { LoginActionsConstants } from "./constants";
import initialState from "../../initialState";

const LoginReducer = (state = initialState.LoginPage, action) => {
  switch (action.type) {
    case LoginActionsConstants.LOGIN_REQ_SUCC:
      state = state.set("username", action.user["username"]);
      state = state.set("location", action.user["location"]);
      state = state.set("picture", action.user["picture"]);
      state = state.set("loggedIn", true);
      return state;
    case LoginActionsConstants.LOGIN_REQ_FAIL:
      return state;
    case LoginActionsConstants.LOGIN_USER_CHNGE:
      state = state.set("username", action.username);
      return state;
    case LoginActionsConstants.LOGOUT_REQ_SUCC:
      state = state.set("username", "");
      state = state.set("loggedIn", false);
      return state;
    case LoginActionsConstants.LOGOUT_REQ_FAIL:
      return state;
    default:
      return state;
  }
};

export default LoginReducer;
