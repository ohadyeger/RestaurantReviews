import { RegisterActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import RegisterActions from "./actions";

function* sendRegisterRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.registerDetails)
    });
    const json = yield call([res, "json"]);

    yield put(RegisterActions.registerRequestSuccess(json[0]));
  } catch (e) {
    yield put(RegisterActions.registerRequestFail(e.message));
  }
}
function* validateRegisterUsername(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = yield call([res, "json"]);
    if (json[0]) {
      yield put(RegisterActions.ValidateFail(json[0]));
    } else {
      yield put(RegisterActions.ValidateSuccess());
    }
  } catch (e) {
    yield put(RegisterActions.ValidateSuccess());
  }
}

function* RegisterSaga() {
  yield takeEvery(RegisterActionsConstants.REGISTER_REQ, sendRegisterRequest);
  yield takeEvery(
    RegisterActionsConstants.REGISTER_USER_VALIDATE,
    validateRegisterUsername
  );
}

export default RegisterSaga;
