import { RestaurantReviewActionsConstants } from "./constants";

function RestaurantReviewRequest(RestaurantReview) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_REQ,
    uri: "api/dev/review",
    details: {
      reviewer: RestaurantReview.reviewer,
      restaurant: RestaurantReview.restaurant,
      pictures: RestaurantReview.pictures,
      rating: {
        bathroomQuality: RestaurantReview.stars[0],
        staffKindness: RestaurantReview.stars[1],
        cleanliness: RestaurantReview.stars[2],
        driveThruQuality: RestaurantReview.stars[3],
        deliverySpeed: RestaurantReview.stars[4],
        foodQuality: RestaurantReview.stars[5]
      }
    }
  };
}
function RestaurantReviewRequestSuccess(msg) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_REQ_SUCC,
    msg: msg
  };
}
function RestaurantReviewRequestFail(msg) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_REQ_FAIL,
    msg: msg
  };
}
function RestaurantReviewStarSet(i, newRating, stars) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_STAR_CHNGE,
    i: i,
    newRating: newRating,
    stars: stars
  };
}
function RestaurantReviewPictureSet(currentPicture, pictureName) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_PICT_SET,
    currentPicture: currentPicture,
    pictureName: pictureName
  };
}
function RestaurantReviewPictureAdd(picture, pictures) {
  return {
    type: RestaurantReviewActionsConstants.REVIEW_PICT_ADD,
    picture: picture,
    pictures: pictures
  };
}
const RestaurantReviewActions = {
  RestaurantReviewRequest,
  RestaurantReviewRequestSuccess,
  RestaurantReviewRequestFail,
  RestaurantReviewStarSet,
  RestaurantReviewPictureSet,
  RestaurantReviewPictureAdd
};

export default RestaurantReviewActions;
