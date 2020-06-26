import { RestaurantViewActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import RestaurantViewActions from "./actions";
//IMPLEMENT!
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

    const restJson = yield call([restRes, "json"]); //retrieve body of response
    const userJson = yield call([userRes, "json"]);
    yield put(
      RestaurantViewActions.RestaurantViewLoadSuccess(restJson, userJson)
    );
  } catch (e) {
    yield put(RestaurantViewActions.RestaurantViewLoadFail(e.message));
  }
}

function* RestaurantViewSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestaurantViewActionsConstants.REST_VIEW_LOAD, loadData);
}

export default RestaurantViewSaga;
