import { UserViewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import UserViewActions from "./actions";

function* loadData(action) {
  try {
    const restRes = yield call(fetch, action.rest_uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const userRes = yield call(fetch, action.user_uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const restJson = yield call([restRes, "json"]);
    const userJson = yield call([userRes, "json"]);
    yield put(UserViewActions.UserViewLoadSuccess(restJson, userJson));
  } catch (e) {
    yield put(UserViewActions.UserViewLoadFail(e.message));
  }
}

function* UserViewSaga() {
  yield takeEvery(UserViewActionsConstants.USERVIEW_LOAD, loadData);
}

export default UserViewSaga;
