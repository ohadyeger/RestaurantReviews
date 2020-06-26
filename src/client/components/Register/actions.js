import { RegisterActionsConstants } from "./constants";

function registerRequest(username, picture, location) {
  return {
    type: RegisterActionsConstants.REGISTER_REQ,
    uri: "/api/dev/users",
    registerDetails: {
      username,
      picture,
      location
    }
  };
}
function registerRequestSuccess(msg) {
  return {
    type: RegisterActionsConstants.REGISTER_SUCC,
    msg: msg
  };
}
function registerRequestFail(msg) {
  return {
    type: RegisterActionsConstants.REGISTER_FAIL,
    msg: msg
  };
}
function registerUserSet(username) {
  return {
    type: RegisterActionsConstants.REGISTER_USER_CHNGE,
    username: username.target.value
  };
}
function registerLocationSet(location) {
  return {
    type: RegisterActionsConstants.REGISTER_LOCT_CHNGE,
    location: location
  };
}
function registerPictureSet(picture, pictureName) {
  return {
    type: RegisterActionsConstants.REGISTER_PICT_CHNGE,
    picture: picture,
    pictureName: pictureName
  };
}
function validateUserName(username) {
  return {
    type: RegisterActionsConstants.REGISTER_USER_VALIDATE,
    uri: `/api/dev/users/validate/${username.target.value}`
  };
}
function ValidateFail() {
  return {
    type: RegisterActionsConstants.REGISTER_USER_VALIDATE_FAIL
  };
}
function ValidateSuccess() {
  return {
    type: RegisterActionsConstants.REGISTER_USER_VALIDATE_SUCC
  };
}
function modalIsOpened() {
  return {
    type: RegisterActionsConstants.MODAL_OPEN
  };
}
function modalIsClosed() {
  return {
    type: RegisterActionsConstants.MODAL_CLOSE
  };
}

const RegisterActions = {
  registerRequest,
  registerRequestSuccess,
  registerRequestFail,
  registerUserSet,
  registerPictureSet,
  registerLocationSet,
  validateUserName,
  ValidateFail,
  ValidateSuccess,
  modalIsOpened,
  modalIsClosed
};

export default RegisterActions;
