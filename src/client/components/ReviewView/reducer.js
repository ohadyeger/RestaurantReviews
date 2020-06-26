import { ReviewViewActionsConstants } from "./constants";
import initialState from "../../initialState";

const ReviewViewReducer = (state = initialState.ReviewView, action) => {
  switch (action.type) {
    case ReviewViewActionsConstants.REVIEW_VIEW_LOAD_SUCC:
      state = state.set("review", action.review);
      return state;
    case ReviewViewActionsConstants.REVIEW_VIEW_LOAD_FAIL:
      return state;
    case ReviewViewActionsConstants.REVIEW_VIEW_KEY_CHNGE:
      state = state.set("searchKey", action.key);
      return state;
    case ReviewViewActionsConstants.REVIEW_VIEW_SELECT_CHNGE:
      state = state.set("selection", action.selection);
      return state;
    case ReviewViewActionsConstants.REVIEW_VIEW_MINI:
      state = state.set("minify", true);
      return state;
    case ReviewViewActionsConstants.REVIEW_VIEW_UNMINI:
      state = state.set("minify", false);
      state = state.set("reviewId", action.reviewId);
      return state;
    default:
      return state;
  }
};

export default ReviewViewReducer;
