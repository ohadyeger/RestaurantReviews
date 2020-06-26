import { RestaurantViewActionsConstants } from "./constants";
import initialState from "../../initialState";

const RestaurantViewReducer = (state = initialState.restaurantView, action) => {
  switch (action.type) {
    case RestaurantViewActionsConstants.REST_VIEW_MINI:
      state = state.set("minify", true);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_UNMINI:
      state = state.set("minify", false);
      state = state.set("restaurantName", action.restaurantName);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_REVIEW_SHOW:
      state = state.set("writeReview", true);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_REVIEW_HIDE:
      state = state.set("writeReview", false);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_SORT_TIME_CHNGE:
      state = state.set("reviewTimeSort", action.sort);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_SORT_CHNGE:
      state = state.set("sortBy", action.sort);
      state = state.set("starFilter", 0);
      state = state.set("topicFilter", "any");
      state = state.set("reviewTimeSort", "oldest");
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_STAR_CHNGE:
      state = state.set("starFilter", action.star);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_TOPIC_CHNGE:
      state = state.set("topicFilter", action.topic);
      return state;
    case RestaurantViewActionsConstants.REST_VIEW_DAYS_FILTER_CHNGE:
      state = state.set("daysFilter", action.filter);
      return state;
    default:
      return state;
  }
};

export default RestaurantViewReducer;
