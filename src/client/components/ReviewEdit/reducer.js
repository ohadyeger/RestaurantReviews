import { ReviewEditActionsConstants } from "./constants";
import initialState from "../../initialState";

const ReviewEditReducer = (state = initialState.ReviewEdit, action) => {
  switch (action.type) {
    case ReviewEditActionsConstants.REVIEW_EDIT_REQ_SUCC:
      state = state.set("review", action.review);
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_REQ_FAIL:
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_STAR_CHNGE:
      const { i, newRating, stars } = action;
      state = state.set(
        "stars",
        stars.map((value, index) => (index == i ? newRating : value))
      );
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_PICT_SET:
      state = state.set("currentPicture", {
        name: action.pictureName,
        data: action.currentPicture,
        contentType: "image/png"
      });
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_PICT_ADD:
      const { picture, pictures } = action;
      state = state.set("pictures", [...pictures, picture]);
      state = state.set("picture", null);
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_LOAD_SUCC:
      state = state.set("review", action.review);
      const { rating } = action.review;
      const myStars = [
        rating["bathroomQuality"],
        rating["cleanliness"],
        rating["deliverySpeed"],
        rating["driveThruQuality"],
        rating["foodQuality"],
        rating["staffKindness"]
      ];
      state = state.set("stars", myStars);
      state = state.set("pictures", action.review.pictures);
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_LOAD_FAIL:
      alert("loading review has failed");
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_MAXIM:
      state = state.set("minimize", false);
      state = state.set("reviewId", action.reviewId);
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_MINIM:
      state = state.set("minimize", true);
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_DELETE_SUCC:
      return state;
    case ReviewEditActionsConstants.REVIEW_EDIT_DELETE_FAIL:
      return state;
    default:
      return state;
  }
};

export default ReviewEditReducer;
