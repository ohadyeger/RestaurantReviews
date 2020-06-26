import { UserEditActionsConstants } from "./constants";
import initialState from "../../initialState";

const UserEditReducer = (state = initialState.UserEdit, action) => {
  switch (action.type) {
    case UserEditActionsConstants.USER_EDIT_SUCC:
      state = state.set("userEditComplete", true);
      return state;
    case UserEditActionsConstants.USER_EDIT_FAIL:
      state = state.set("userEditComplete", false);
      return state;
    case UserEditActionsConstants.USER_EDIT_USER_CHNGE:
      state = state.set("username", action.username);
      return state;
    case UserEditActionsConstants.USER_EDIT_LOCT_CHNGE:
      if (action.location) {
        const { lat, lng } = action.location.location;
        state = state.set("location", {
          description: action.location.description,
          lat: lat,
          lng: lng
        });
      }
      return state;
    case UserEditActionsConstants.USER_EDIT_LOCT_VALIDATE:
      return state;
    case UserEditActionsConstants.USER_EDIT_PICT_VALIDATE:
      return state;
    case UserEditActionsConstants.USER_EDIT_USER_VALIDATE_SUCC:
      state = state.set("userValid", true);
      return state;
    case UserEditActionsConstants.USER_EDIT_USER_VALIDATE_FAIL:
      state = state.set("userValid", false);
      return state;
    case UserEditActionsConstants.USER_EDIT_LOAD_USER_SUCC:
      state = state.set("user", action.user);
      return state;
    case UserEditActionsConstants.USER_EDIT_LOAD_USER_FAIL:
      return state;
    case UserEditActionsConstants.USER_EDIT_MODAL_OPEN:
      state = state.set("modalIsOpened", true);
      return state;
    case UserEditActionsConstants.USER_EDIT_MODAL_CLOSE:
      state = state.set("modalIsOpened", false);
      return state;
    default:
      return state;
  }
};

export default UserEditReducer;
