import { RestaurantViewActionsConstants } from "./constants";

function Unminify(restaurantName) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_UNMINI,
    restaurantName: restaurantName
  };
}
function Minify() {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_MINI
  };
}
function WriteReviewShow() {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_REVIEW_SHOW
  };
}
function WriteReviewHide() {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_REVIEW_HIDE
  };
}
function ReviewsSortByChange(sort) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_SORT_CHNGE,
    sort: sort
  };
}
function ReviewsSortByTimeChange(sort) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_SORT_TIME_CHNGE,
    sort: sort
  };
}
function ReviewsTopicChange(topic) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_TOPIC_CHNGE,
    topic: topic
  };
}
function ReviewsStarChange(star) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_STAR_CHNGE,
    star: star
  };
}
function RestaurantDaysFilterChange(filter) {
  return {
    type: RestaurantViewActionsConstants.REST_VIEW_DAYS_FILTER_CHNGE,
    filter: filter
  };
}
const RestaurantViewActions = {
  Minify,
  Unminify,
  WriteReviewShow,
  WriteReviewHide,
  ReviewsSortByChange,
  ReviewsSortByTimeChange,
  ReviewsTopicChange,
  ReviewsStarChange,
  RestaurantDaysFilterChange
};

export default RestaurantViewActions;
