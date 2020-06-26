import { RestaurantActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import RestaurantActions from "./actions";

function* restaurantRequest(action) {
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(action.restaurantDetails)
    });

    const json = yield call([res, "json"]); //retrieve body of response
    yield put(RestaurantActions.RestaurantRequestSuccess(json));
  } catch (e) {
    yield put(RestaurantActions.RestaurantRequestFail(e.message));
  }
}

function* RestaurantSaga() {
  yield takeEvery(RestaurantActionsConstants.RESTAURANT_REQ, restaurantRequest);
}

export default RestaurantSaga;
