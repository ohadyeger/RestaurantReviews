import { RegisterActionsConstants } from "./constants";
import initialState from "../../initialState";
import { List } from "immutable";
import RegisterActions from "./actions";

const RegisterReducer = (state = initialState.register, action) => {
  switch (action.type) {
    case RegisterActionsConstants.REGISTER_SUCC:
      state = state.set("registerComplete", true);
      return state;
    case RegisterActionsConstants.REGISTER_FAIL:
      state = state.set("registerComplete", false);
      return state;
    case RegisterActionsConstants.REGISTER_USER_CHNGE:
      state = state.set("username", action.username);
      return state;
    case RegisterActionsConstants.REGISTER_LOCT_CHNGE:
      if (action.location) {
        const { lat, lng } = action.location.location;
        state = state.set("location", {
          description: action.location.description,
          lat: lat,
          lng: lng
        });
      }
      return state;
    case RegisterActionsConstants.REGISTER_PICT_CHNGE:
      state = state.set("picture", {
        name: action.pictureName,
        data: action.picture,
        contentType: "image/png"
      });
      return state;
    case RegisterActionsConstants.REGISTER_LOCT_VALIDATE:
      return state;
    case RegisterActionsConstants.REGISTER_PICT_VALIDATE:
      return state;
    case RegisterActionsConstants.REGISTER_USER_VALIDATE_SUCC:
      state = state.set("userValid", true);
      return state;
    case RegisterActionsConstants.REGISTER_USER_VALIDATE_FAIL:
      state = state.set("userValid", false);
      return state;
    case RegisterActionsConstants.MODAL_OPEN:
      state = state.set("modalIsOpened", true);
      return state;
    case RegisterActionsConstants.MODAL_CLOSE:
      state = state.set("modalIsOpened", false);
      return state;
    default:
      return state;
  }
};

export default RegisterReducer;
