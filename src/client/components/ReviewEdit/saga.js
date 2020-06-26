import { ReviewEditActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import ReviewEditActions from "./actions";

function* sendReviewEditRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.details)
    });
    const json = yield call([res, "json"]);
    yield put(ReviewEditActions.ReviewEditRequestSuccess(json));
  } catch (e) {
    yield put(ReviewEditActions.ReviewEditRequestFail(e.message));
  }
}
function* loadReviewEditRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]);
    yield put(ReviewEditActions.ReviewEditLoadReviewSuccess(json));
  } catch (e) {
    yield put(ReviewEditActions.ReviewEditLoadReviewFail(e.message));
  }
}
function* loadReviewDeleteRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]);
    yield put(ReviewEditActions.LoadReviewDeleteRequestSuccess(json));
  } catch (e) {
    yield put(ReviewEditActions.LoadReviewDeleteRequestFail(e.message));
  }
}

function* ReviewEditSaga() {
  yield takeEvery(
    ReviewEditActionsConstants.REVIEW_EDIT_REQ,
    sendReviewEditRequest
  );
  yield takeEvery(
    ReviewEditActionsConstants.REVIEW_EDIT_LOAD,
    loadReviewEditRequest
  );
  yield takeEvery(
    ReviewEditActionsConstants.REVIEW_EDIT_DELETE,
    loadReviewDeleteRequest
  );
}

export default ReviewEditSaga;
