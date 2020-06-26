import { LoginActionsConstants } from "./constants";

function Login(username) {
  return {
    type: LoginActionsConstants.LOGIN_REQ,
    uri: `/api/dev/users/${username}`
  };
}
function Logout() {
  return {
    type: LoginActionsConstants.LOGOUT_REQ,
    uri: "/api/dev/users/logout"
  };
}
function LoginSuccess(user) {
  return {
    type: LoginActionsConstants.LOGIN_REQ_SUCC,
    user: user
  };
}
function LogoutSuccess(res) {
  return {
    type: LoginActionsConstants.LOGOUT_REQ_SUCC,
    res: res
  };
}
function LoginFail(msg) {
  return {
    type: LoginActionsConstants.LOGIN_REQ_FAIL,
    msg: msg
  };
}
function LogoutFail(msg) {
  return {
    type: LoginActionsConstants.LOGOUT_REQ_FAIL,
    msg: msg
  };
}
function LoginUserSet(username) {
  return {
    type: LoginActionsConstants.LOGIN_USER_CHNGE,
    username: username.target.value
  };
}
const LoginActions = {
  Login,
  Logout,
  LoginSuccess,
  LogoutSuccess,
  LoginFail,
  LogoutFail,
  LoginUserSet
};

export default LoginActions;
