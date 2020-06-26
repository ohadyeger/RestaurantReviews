import { all } from "redux-saga/effects";
import AppSaga from "./components/App/saga";
import RegisterSaga from "./components/Register/saga";
import LoginSaga from "./components/LoginPage/saga";
import RestaurantSaga from "./components/Restaurant/saga";
import SearchSaga from "./components/Search/saga";
import RestaurantReviewSaga from "./components/RestaurantReview/saga";
import ReviewViewSaga from "./components/ReviewView/saga";
import UserEditSaga from "./components/UserEdit/saga";
import ReviewEditSaga from "./components/ReviewEdit/saga";

export default function* Sagas() {
  yield all([
    AppSaga(),
    RegisterSaga(),
    LoginSaga(),
    RestaurantSaga(),
    SearchSaga(),
    RestaurantReviewSaga(),
    ReviewViewSaga(),
    UserEditSaga(),
    ReviewEditSaga()
  ]);
}
