import React from "react";
import { connect } from "react-redux";
import ReviewViewActions from "./actions";
import ReviewEdit from "../ReviewEdit/ReviewEdit";
import PropTypes from "prop-types";

class ReviewView extends React.Component {
  render() {
    return (
      <div>
        {this.props.review ? (
          !this.props.minify ? (
            this.props.reviewId == this.props.expandReviewId ? (
              <ul>
                <li>Reviewer Name: </li>
                <div>{this.props.review.reviewer.username}</div>
                <li>Restaurant: {this.props.review.restaurant.name}</li>
                <li>
                  bathroomQuality:{this.props.review.rating.bathroomQuality}
                </li>
                <li>cleanliness:{this.props.review.rating.cleanliness}</li>
                <li>deliverySpeed:{this.props.review.rating.deliverySpeed}</li>
                <li>
                  driveThruQuality:{this.props.review.rating.driveThruQuality}
                </li>
                <li>foodQuality:{this.props.review.rating.foodQuality}</li>
                <li>staffKindness:{this.props.review.rating.staffKindness}</li>
                <li>Pictures:</li>
                {this.props.review.pictures &&
                  this.props.review.pictures.map((picture, index) => (
                    <div key={index}>
                      <img src={picture.data} />
                    </div>
                  ))}
                <button
                  className="ui secondary button"
                  onClick={this.props.Minify}
                >
                  collapse review
                </button>
              </ul>
            ) : (
              <div>
                <li>Reviewer Name: </li>
                <div>{this.props.review.reviewer.username}</div>
                <li>Restaurant: {this.props.review.restaurant.name}</li>
                <button
                  className="ui primary button"
                  onClick={() => {
                    this.props.Unminify(this.props.reviewId);
                  }}
                >
                  expand review
                </button>
              </div>
            )
          ) : (
            <div>
              <li>Reviewer: </li>
              <div>{this.props.review.reviewer.username}</div>
              <li>Restaurant: {this.props.review.restaurant.name}</li>
              <button
                className="ui primary button"
                onClick={() => {
                  this.props.Unminify(this.props.reviewId);
                }}
              >
                expand review
              </button>
            </div>
          )
        ) : (
          []
        )}
        {this.props.isEditor ? (
          <ReviewEdit
            review={this.props.review}
            reviewId={this.props.reviewId}
            loggedInUserId={this.props.loggedInUserId}
          />
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
    expandReviewId: state["reviewView"].get("reviewId"),
    review: props.review,
    minify: state["reviewView"].get("minify"),
    userId: state["app"].get("userId"),
    loggedInUserId: props.loggedInUserId,
    isEditor: props.review.reviewer._id == props.loggedInUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ReviewViewLoad: id => {
      dispatch(ReviewViewActions.ReviewViewLoad(id));
    },
    Unminify: reviewId => {
      dispatch(ReviewViewActions.Unminify(reviewId));
    },
    Minify: () => {
      dispatch(ReviewViewActions.Minify());
    }
  };
};

ReviewView.propTypes = {
  reviewId: PropTypes.string,
  expandReviewId: PropTypes.string,
  review: PropTypes.object,
  minify: PropTypes.bool,
  userId: PropTypes.object,
  loggedInUserId: PropTypes.string,
  isEditor: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewView);
