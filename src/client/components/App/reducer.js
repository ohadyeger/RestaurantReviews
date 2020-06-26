import initialState from "../../initialState";
import { AppActionsConstants } from "./constants.js";
import { List } from "immutable";

const AppReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case AppActionsConstants.LOAD_USER:
      if (action.name && action.name != "") {
        state = state.set("username", action.name);
        state = state.set("loggedIn", true);
      } else {
        state = state.set("username", "");
        state = state.set("loggedIn", false);
      }
      return state;

    case AppActionsConstants.UPDATE_USER:
      state = state.set("username", action.userDetails.get["username"]);
      state = state.set("picture", action.userDetails.get["picture"]);
      state = state.set("location", action.userDetails.get["location"]);
      state = state.set("loggedIn", action.userDetails.get["loggedIn"]);
      return state;

    default:
      return state;
  }
};

export default AppReducer;
