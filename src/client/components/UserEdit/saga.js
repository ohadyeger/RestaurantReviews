import { UserEditActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import UserEditActions from "./actions";

function* editUser(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.userEditDetails)
    });
    const json = yield call([res, "json"]);
    yield put(UserEditActions.userEditRequestSuccess(json));
  } catch (e) {
    yield put(UserEditActions.userEditRequestFail(e.message));
  }
}
function* validateEditUsername(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = yield call([res, "json"]);
    if (json[0]) {
      yield put(UserEditActions.ValidateFail());
    } else {
      yield put(UserEditActions.ValidateSuccess());
    }
  } catch (e) {
    yield put(UserEditActions.ValidateSuccess());
  }
}
function* loadReviews(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = yield call([res, "json"]); //retrieve body of response

    yield put(UserEditActions.userEditLoadUserSuccess(json));
  } catch (e) {
    yield put(UserEditActions.userEditLoadUserFail(e.message));
  }
}

function* UserEditSaga() {
  yield takeEvery(UserEditActionsConstants.USER_EDIT_REQ, editUser);
  yield takeEvery(
    UserEditActionsConstants.USER_EDIT_USER_VALIDATE,
    validateEditUsername
  );
  yield takeEvery(UserEditActionsConstants.USER_EDIT_LOAD_USER, loadReviews);
}

export default UserEditSaga;
