import { LoginActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import LoginActions from "./actions";

function* Login(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]);
    yield put(LoginActions.LoginSuccess(json));
  } catch (e) {
    yield put(LoginActions.LoginFail(e));
  }
}
function* Logout(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]);
    yield put(LoginActions.LogoutSuccess(json));
  } catch (e) {
    yield put(LoginActions.LogoutFail(e));
  }
}

function* LoginSaga() {
  yield takeEvery(LoginActionsConstants.LOGIN_REQ, Login);
  yield takeEvery(LoginActionsConstants.LOGOUT_REQ, Logout);
}

export default LoginSaga;
