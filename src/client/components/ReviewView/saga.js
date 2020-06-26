import { ReviewViewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import ReviewViewActions from "./actions";

function* loadData(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const Json = yield call([res, "json"]);
    yield put(ReviewViewActions.ReviewViewLoadSuccess(Json));
  } catch (e) {
    yield put(ReviewViewActions.ReviewViewLoadFail(e.message));
  }
}

function* ReviewViewSaga() {
  yield takeEvery(ReviewViewActionsConstants.REVIEW_VIEW_LOAD, loadData);
}

export default ReviewViewSaga;
