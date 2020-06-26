import React from "react";
import { connect } from "react-redux";
import RestaurantReviewActions from "./actions";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

import "./style.css";

class RestaurantReview extends React.Component {
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
      this.props.RestaurantReviewPictureSet(fileReader.result, pic.name);
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
                  this.props.RestaurantReviewStarSet(
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
      <div className="ui centered card">
        <h1 className="ui header">Write a review for:</h1>
        <h3>{this.props.restaurant.name}</h3>
        <h4 className="ui left aligned header">
          Reviewer: {this.props.reviewer}
        </h4>

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
              this.props.RestaurantReviewPictureAdd(
                this.props.currentPicture,
                this.props.pictures
              )
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
              onClick={() => this.props.RestaurantReviewRequest(this.props)}
            >
              {" "}
              Send Review
            </div>
          ) : (
            <div
              className="ui bottom disabled attached button"
              onClick={() => this.props.RestaurantReviewRequest(this.props)}
            >
              Send Review
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    restaurant: props.restaurant,
    reviewer: props.currentUser,
    stars: state["review"].get("stars"),
    currentPicture: state["review"].get("currentPicture"),
    pictures: state["review"].get("pictures"),
    loggedIn: state["app"].get("loggedIn"),
    userId: state["app"].get("userId")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    RestaurantReviewRequest: RestaurantReviewDetails => {
      dispatch(
        RestaurantReviewActions.RestaurantReviewRequest(RestaurantReviewDetails)
      );
    },
    RestaurantReviewStarSet: (i, newRating, stars) => {
      dispatch(
        RestaurantReviewActions.RestaurantReviewStarSet(i, newRating, stars)
      );
    },
    RestaurantReviewPictureSet: (currentPicture, pictureName) => {
      dispatch(
        RestaurantReviewActions.RestaurantReviewPictureSet(
          currentPicture,
          pictureName
        )
      );
    },
    RestaurantReviewPictureAdd: (picture, pictures) => {
      dispatch(
        RestaurantReviewActions.RestaurantReviewPictureAdd(picture, pictures)
      );
    }
  };
};

RestaurantReview.propTypes = {
  restaurant: PropTypes.string,
  reviewer: PropTypes.string,
  stars: PropTypes.array,
  currentPicture: PropTypes.object,
  pictures: PropTypes.array,
  loggedIn: PropTypes.bool,
  userId: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantReview);
