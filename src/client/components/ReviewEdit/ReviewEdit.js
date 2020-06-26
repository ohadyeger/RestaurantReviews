import React from "react";
import { connect } from "react-redux";
import ReviewEditActions from "./actions";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

import "./style.css";

class ReviewEdit extends React.Component {
  componentWillMount() {
    this.props.ReviewEditLoadReview(this.props.reviewId);
  }
  topics = [
    "Bathroom Quality",
    "Staff Kindness",
    "Cleanliness",
    "Drive-thru quality",
    "Delivery Speed",
    "Food Quality"
  ];
  handleImage = event => {
    const fileReader = new FileReader();
    const pic = event.target.files[0];

    fileReader.onloadend = () => {
      this.props.ReviewEditPictureSet(fileReader.result, pic.name);
    };
    fileReader.readAsDataURL(pic);
  };

  render() {
    const duplicateStars = times =>
      times
        ? [
            <li key={times - 1}>
              <StarRatings
                rating={this.props.stars[times - 1]}
                starRatedColor="blue"
                changeRating={newRating =>
                  this.props.ReviewEditStarSet(
                    times - 1,
                    newRating,
                    this.props.stars
                  )
                }
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />
              <div>{this.topics[times - 1]}</div>
            </li>
          ].concat(duplicateStars(times - 1))
        : "";

    return (
      <div>
        {this.props.review &&
        !this.props.minimize &&
        this.props.maximReviewId == this.props.reviewId ? (
          <div className="ui centered card">
            <h1 className="ui header">Edit a review for:</h1>
            <h3>{this.props.review.restaurant.name}</h3>
            <h4 className="ui left aligned header">
              Reviewer: {this.props.review.reviewer.username}
            </h4>
            <button
              className="ui negative button"
              onClick={() => this.props.ReviewEditDelete(this.props.reviewId)}
            >
              Delete
            </button>
            <button
              className="ui compact button"
              onClick={this.props.ReviewEditMinimize}
            >
              Close editor
            </button>

            <ul>{duplicateStars(6)}</ul>

            <div className="ui content">
              <input
                className="field "
                type="file"
                accept="image/"
                onChange={this.handleImage}
                placeholder="Picture"
              />
              <div
                className="ui bottom attached button"
                onClick={() =>
                  this.props.currentPicture
                    ? this.props.ReviewEditPictureAdd(
                        this.props.currentPicture,
                        this.props.pictures
                      )
                    : {}
                }
              >
                <i className="add icon" />
                Add picture
              </div>
              <ul className="content">
                {this.props.pictures.map((picture, index) => (
                  <li key={index}> {picture.name}</li>
                ))}
              </ul>
              {this.props.loggedIn ? (
                <div
                  className="ui bottom attached button"
                  onClick={() => {
                    this.props.ReviewEditRequest(this.props);
                    this.props.ReviewEditMinimize();
                  }}
                >
                  {" "}
                  Send Review
                </div>
              ) : (
                <div className="ui bottom disabled attached button">
                  Send Review
                </div>
              )}
            </div>
          </div>
        ) : this.props.review && this.props.minimize && this.props.isEditor ? (
          <button
            className="ui small button"
            onClick={() => {
              this.props.ReviewEditMaximize(this.props.reviewId);
            }}
          >
            edit review
          </button>
        ) : (
          []
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    reviewId: props.reviewId,
    maximReviewId: state["reviewEdit"].get("reviewId"),
    review: props.review,
    minimize: state["reviewEdit"].get("minimize"),
    stars: state["reviewEdit"].get("stars"),
    currentPicture: state["reviewEdit"].get("currentPicture"),
    pictures: state["reviewEdit"].get("pictures"),
    loggedIn: state["app"].get("loggedIn"),
    userId: state["app"].get("userId"),
    loggedInUserId: props.loggedInUserId,
    isEditor: props.review && props.review.reviewer._id === props.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ReviewEditRequest: ReviewEditDetails => {
      dispatch(ReviewEditActions.ReviewEditRequest(ReviewEditDetails));
    },
    ReviewEditStarSet: (i, newRating, stars) => {
      dispatch(ReviewEditActions.ReviewEditStarSet(i, newRating, stars));
    },
    ReviewEditPictureSet: (currentPicture, pictureName) => {
      dispatch(
        ReviewEditActions.ReviewEditPictureSet(currentPicture, pictureName)
      );
    },
    ReviewEditPictureAdd: (picture, pictures) => {
      dispatch(ReviewEditActions.ReviewEditPictureAdd(picture, pictures));
    },
    ReviewEditLoadReview: reviewId => {
      dispatch(ReviewEditActions.ReviewEditLoadReview(reviewId));
    },
    ReviewEditMaximize: reviewId => {
      dispatch(ReviewEditActions.ReviewEditMaximize(reviewId));
    },
    ReviewEditMinimize: () => {
      dispatch(ReviewEditActions.ReviewEditMinimize());
    },
    ReviewEditDelete: reviewId => {
      dispatch(ReviewEditActions.ReviewEditDelete(reviewId));
    }
  };
};

ReviewEdit.propTypes = {
  reviewId: PropTypes.string,
  maximReviewId: PropTypes.string,
  review: PropTypes.object,
  minimize: PropTypes.bool,
  stars: PropTypes.array,
  currentPicture: PropTypes.object,
  pictures: PropTypes.array,
  loggedIn: PropTypes.bool,
  userId: PropTypes.string,
  loggedInUserId: PropTypes.string,
  isEditor: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewEdit);
