import { ReviewViewActionsConstants } from "./constants";

function ReviewViewLoad(id) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD,
    uri: "/api/dev/review/" + id
  };
}
function ReviewViewLoadSuccess(review) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD_SUCC,
    review: review
  };
}
function ReviewViewLoadFail(msg) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_LOAD_FAIL,
    msg: msg
  };
}
function ReviewViewKeyChange(key) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_KEY_CHNGE,
    key: key
  };
}
function ReviewViewSelectionChange(selection) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_SELECT_CHNGE,
    selection: selection
  };
}
function Unminify(reviewId) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_UNMINI,
    reviewId: reviewId
  };
}
function Minify(selection) {
  return {
    type: ReviewViewActionsConstants.REVIEW_VIEW_MINI
  };
}
const ReviewViewActions = {
  ReviewViewLoad,
  ReviewViewLoadSuccess,
  ReviewViewLoadFail,
  ReviewViewKeyChange,
  ReviewViewSelectionChange,
  Unminify,
  Minify
};

export default ReviewViewActions;
