import { UserViewActionsConstants } from "./constants";

function Unminify(username) {
  return {
    type: UserViewActionsConstants.USER_VIEW_UNMINI,
    username: username
  };
}
function Minify() {
  return {
    type: UserViewActionsConstants.USER_VIEW_MINI
  };
}

const UserViewActions = {
  Unminify,
  Minify
};

export default UserViewActions;
