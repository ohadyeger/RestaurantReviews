import { UserEditActionsConstants } from "./constants";

function userEditRequest(username, location, currentUser) {
  return {
    type: UserEditActionsConstants.USER_EDIT_REQ,
    uri: "/api/dev/userschange/" + currentUser,
    userEditDetails: {
      username,
      location
    }
  };
}
function userEditRequestSuccess(msg) {
  return {
    type: UserEditActionsConstants.USER_EDIT_SUCC,
    msg: msg
  };
}
function userEditRequestFail(msg) {
  return {
    type: UserEditActionsConstants.USER_EDIT_FAIL,
    msg: msg
  };
}
function userEditUserSet(username) {
  return {
    type: UserEditActionsConstants.USER_EDIT_USER_CHNGE,
    username: username.target.value
  };
}
function userEditLocationSet(location) {
  return {
    type: UserEditActionsConstants.USER_EDIT_LOCT_CHNGE,
    location: location
  };
}
function userEditPictureSet(picture, pictureName) {
  return {
    type: UserEditActionsConstants.USER_EDIT_PICT_CHNGE,
    picture: picture,
    pictureName: pictureName
  };
}
function validateUserName(username) {
  return {
    type: UserEditActionsConstants.USER_EDIT_USER_VALIDATE,
    uri: `/api/dev/users/validate/${username.target.value}`
  };
}
function ValidateFail() {
  return {
    type: UserEditActionsConstants.USER_EDIT_USER_VALIDATE_FAIL
  };
}
function ValidateSuccess() {
  return {
    type: UserEditActionsConstants.USER_EDIT_USER_VALIDATE_SUCC
  };
}
function userEditLoadUser(username) {
  return {
    type: UserEditActionsConstants.USER_EDIT_LOAD_USER,
    uri: "/api/dev/loaduser/" + username
  };
}
function userEditLoadUserSuccess(user) {
  return {
    type: UserEditActionsConstants.USER_EDIT_LOAD_USER_SUCC,
    user: user
  };
}
function userEditLoadUserFail(msg) {
  return {
    type: UserEditActionsConstants.USER_EDIT_LOAD_USER_FAIL,
    msg: msg
  };
}
function modalIsOpened() {
  return {
    type: UserEditActionsConstants.USER_EDIT_MODAL_OPEN
  };
}
function modalIsClosed() {
  return {
    type: UserEditActionsConstants.USER_EDIT_MODAL_CLOSE
  };
}
const UserEditActions = {
  userEditRequest,
  userEditRequestSuccess,
  userEditRequestFail,
  userEditUserSet,
  userEditPictureSet,
  userEditLocationSet,
  validateUserName,
  ValidateFail,
  ValidateSuccess,
  userEditLoadUser,
  userEditLoadUserSuccess,
  userEditLoadUserFail,
  modalIsOpened,
  modalIsClosed
};

export default UserEditActions;
