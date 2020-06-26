import { RestaurantReviewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import RestaurantReviewActions from "./actions";

function* sendRestaurantReviewRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.details)
    });
    const json = yield call([res, "json"]);
    yield put(RestaurantReviewActions.RestaurantReviewRequestSuccess(json));
  } catch (e) {
    yield put(RestaurantReviewActions.RestaurantReviewRequestFail(e.message));
  }
}

function* RestaurantReviewSaga() {
  yield takeEvery(
    RestaurantReviewActionsConstants.REVIEW_REQ,
    sendRestaurantReviewRequest
  );
}

export default RestaurantReviewSaga;
