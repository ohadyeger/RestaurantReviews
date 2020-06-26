import { ReviewEditActionsConstants } from "./constants";

function ReviewEditRequest(ReviewEdit) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_REQ,
    uri: "api/dev/reviewedit/" + ReviewEdit.reviewId,
    details: {
      reviewer: ReviewEdit.reviewer,
      restaurant: ReviewEdit.restaurant,
      pictures: ReviewEdit.pictures,
      rating: {
        bathroomQuality: ReviewEdit.stars[0],
        staffKindness: ReviewEdit.stars[1],
        cleanliness: ReviewEdit.stars[2],
        driveThruQuality: ReviewEdit.stars[3],
        deliverySpeed: ReviewEdit.stars[4],
        foodQuality: ReviewEdit.stars[5]
      }
    }
  };
}
function ReviewEditRequestSuccess(review) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_REQ_SUCC,
    review: review
  };
}
function ReviewEditRequestFail(msg) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_REQ_FAIL,
    msg: msg
  };
}
function ReviewEditStarSet(i, newRating, stars) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_STAR_CHNGE,
    i: i,
    newRating: newRating,
    stars: stars
  };
}
function ReviewEditPictureSet(currentPicture, pictureName) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_PICT_SET,
    currentPicture: currentPicture,
    pictureName: pictureName
  };
}
function ReviewEditPictureAdd(picture, pictures) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_PICT_ADD,
    picture: picture,
    pictures: pictures
  };
}
function ReviewEditLoadReview(id) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD,
    uri: "api/dev/review/" + id
  };
}
function ReviewEditLoadReviewSuccess(review) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD_SUCC,
    review: review
  };
}
function ReviewEditLoadReviewFail(msg) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_LOAD_FAIL,
    msg: msg
  };
}
function ReviewEditMaximize(reviewId) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_MAXIM,
    reviewId: reviewId
  };
}
function ReviewEditMinimize() {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_MINIM
  };
}
function ReviewEditDelete(reviewId) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_DELETE,
    uri: "api/dev/review/" + reviewId
  };
}
function LoadReviewDeleteRequestSuccess(json) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_DELETE_SUCC,
    json: json
  };
}
function LoadReviewDeleteRequestFail(msg) {
  return {
    type: ReviewEditActionsConstants.REVIEW_EDIT_DELETE_FAIL,
    msg: msg
  };
}

const ReviewEditActions = {
  ReviewEditRequest,
  ReviewEditRequestSuccess,
  ReviewEditRequestFail,
  ReviewEditStarSet,
  ReviewEditPictureSet,
  ReviewEditPictureAdd,
  ReviewEditLoadReview,
  ReviewEditLoadReviewSuccess,
  ReviewEditLoadReviewFail,
  ReviewEditMaximize,
  ReviewEditMinimize,
  ReviewEditDelete,
  LoadReviewDeleteRequestSuccess,
  LoadReviewDeleteRequestFail
};

export default ReviewEditActions;
