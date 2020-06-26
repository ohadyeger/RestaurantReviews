import { UserViewActionsConstants } from "./constants";
import initialState from "../../initialState";

const UserViewReducer = (state = initialState.UserView, action) => {
  switch (action.type) {
    case UserViewActionsConstants.USER_VIEW_MINI:
      state = state.set("minify", true);
      return state;
    case UserViewActionsConstants.USER_VIEW_UNMINI:
      state = state.set("minify", false);
      state = state.set("username", action.username);
      return state;
    default:
      return state;
  }
};

export default UserViewReducer;
