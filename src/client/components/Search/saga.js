import { SearchActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import SearchActions from "./actions";

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
    yield put(SearchActions.SearchLoadSuccess(restJson, userJson));
  } catch (e) {
    yield put(SearchActions.SearchLoadFail(e.message));
  }
}

function* SearchSaga() {
  yield takeEvery(SearchActionsConstants.SEARCH_LOAD, loadData);
}

export default SearchSaga;
