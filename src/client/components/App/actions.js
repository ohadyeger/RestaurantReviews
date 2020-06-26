import { AppActionsConstants } from "./constants.js";

function updateUserDetails(userDetails) {
  return {
    type: AppActionsConstants.UPDATE_TAG,
    userDetails: userDetails
  };
}
function updateTagAction(tag) {
  return {
    type: AppActionsConstants.UPDATE_TAG,
    payload: {
      tag
    }
  };
}
function loadTagsAction() {
  return {
    type: AppActionsConstants.LOAD_TAGS,
    uri: "/api/load/tags"
  };
}
function loadTagsSuccessAction(tags) {
  return {
    type: AppActionsConstants.LOAD_TAGS_SUCCESS,
    payload: {
      tags: tags
    }
  };
}
function loadTagsFailureAction(error) {
  return {
    type: AppActionsConstants.LOAD_TAGS_FAILURE,
    error: error
  };
}
function loadUserEventHandler(name) {
  return {
    type: AppActionsConstants.LOAD_USER,
    name: name
  };
}

const AppActions = {
  updateTagAction,
  loadTagsAction,
  loadTagsSuccessAction,
  loadTagsFailureAction,
  loadUserEventHandler,
  updateUserDetails
};

export default AppActions;
