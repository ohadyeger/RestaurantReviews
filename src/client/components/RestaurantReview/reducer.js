import { RestaurantReviewActionsConstants } from "./constants";
import initialState from "../../initialState";

const RestaurantReviewReducer = (
  state = initialState.RestaurantReview,
  action
) => {
  switch (action.type) {
    case RestaurantReviewActionsConstants.REVIEW_REQ_SUCC:
      state = initialState.RestaurantReview;
      return state;
    case RestaurantReviewActionsConstants.REVIEW_REQ_FAIL:
      state = initialState.RestaurantReview;
      return state;
    case RestaurantReviewActionsConstants.REVIEW_STAR_CHNGE:
      const { i, newRating, stars } = action;
      state = state.set(
        "stars",
        stars.map((value, index) => (index == i ? newRating : value))
      );
      return state;
    case RestaurantReviewActionsConstants.REVIEW_PICT_SET:
      state = state.set("currentPicture", {
        name: action.pictureName,
        data: action.currentPicture,
        contentType: "image/png"
      });
      return state;
    case RestaurantReviewActionsConstants.REVIEW_PICT_ADD:
      const { picture, pictures } = action;
      state = state.set("pictures", [...pictures, picture]);
      state = state.set("picture", null);
      return state;
    default:
      return state;
  }
};

export default RestaurantReviewReducer;
