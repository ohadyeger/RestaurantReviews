import React from "react";
import { connect } from "react-redux";
import RestaurantViewActions from "./actions";
import ReviewView from "../ReviewView/ReviewView";
import RestaurantReview from "../RestaurantReview/RestaurantReview";
import PropTypes from "prop-types";

const sortByTopicRating = topic => (review1, review2) =>
  topic == "any" ? 0 : review2.rating[topic] - review1.rating[topic];

const filterByTopicRating = (topic, stars) => review =>
  topic == "any" || review.rating[topic] >= stars;

const dayDifference = (date1, date2) =>
  Math.ceil(
    Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  );

const dateFormat = require("dateformat");

function parseDate(str) {
  var mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(date2, date1) {
  return parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
}

const filterReviewByLatest = filter => review => {
  const today = new Date();
  const { createdAt } = review;
  const dayDifferenceRes = datediff(
    new Date(dateFormat(today, "isoDateTime")),
    new Date(dateFormat(createdAt, "isoDateTime"))
  );
  filter == "week"
    ? dayDifferenceRes <= 7
    : filter == "month"
    ? dayDifferenceRes <= 31
    : filter == "year"
    ? dayDifferenceRes <= 365
    : true;
};

class RestaurantView extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.minify ? (
          <div className="ui centered card">
            <div>Name: {this.props.restaurant.name}</div>
            <button
              className="ui button"
              onClick={() => {
                this.props.Unminify(this.props.restaurant.name);
              }}
            >
              expand restuarant
            </button>
          </div>
        ) : (
          <div className="ui centered card">
            <div className="content">Name: {this.props.restaurant.name}</div>
            <div className="content">
              Location: {this.props.restaurant.location.description}
            </div>
            Sort By:
            <select
              className="ui selection dropdown"
              value={this.props.sortBy}
              onChange={this.props.ReviewsSortByChange}
            >
              <option value="date">date</option>
              <option value="topic">topic</option>
            </select>
            {this.props.sortBy == "date" ? (
              <div>
                <select
                  className="ui selection dropdown"
                  value={this.props.reviewTimeSort}
                  onChange={this.props.ReviewsSortByTimeChange}
                >
                  <option value="oldest">oldest first</option>
                  <option value="newest">newest first</option>
                </select>
                <select
                  className="ui selection dropdown"
                  value={this.props.daysFilter}
                  onChange={this.props.RestaurantDaysFilterChange}
                >
                  <option value="allTime">All time</option>
                  <option value="week">since last week</option>
                  <option value="month">since last month</option>
                  <option value="year">since last year</option>
                </select>
              </div>
            ) : (
              <div>
                <select
                  className="ui selection dropdown"
                  value={this.props.starFilter}
                  onChange={this.props.ReviewsStarChange}
                >
                  <option value="0">Over 0 stars</option>
                  <option value="1">Over 1 star</option>
                  <option value="2">Over 2 stars</option>
                  <option value="3">Over 3 stars</option>
                  <option value="4">Over 4 stars</option>
                </select>
                <select
                  className="ui selection dropdown"
                  value={this.props.topicFilter}
                  onChange={this.props.ReviewsTopicChange}
                >
                  <option value="any">no filter</option>
                  <option value="bathroomQuality">bathroomQuality</option>
                  <option value="cleanliness">cleanliness</option>
                  <option value="deliverySpeed">deliverySpeed</option>
                  <option value="driveThruQuality">driveThruQuality</option>
                  <option value="foodQuality">foodQuality</option>
                  <option value="staffKindness">staffKindness</option>
                </select>
              </div>
            )}
            <div className="content">
              Reviews:{" "}
              {this.props.reviewTimeSort == "oldest" ? (
                <div>
                  {this.props.restaurant.reviews
                    .filter(
                      filterByTopicRating(
                        this.props.topicFilter,
                        this.props.starFilter
                      )
                    )
                    .sort(sortByTopicRating(this.props.topicFilter))
                    .map((review, index) => (
                      <ReviewView
                        key={index}
                        review={review}
                        reviewId={review._id}
                        loggedInUserId={this.props.loggedInUserId}
                      />
                    ))}
                </div>
              ) : (
                <div>
                  {this.props.restaurant.reviews
                    .reverse()
                    .filter(
                      filterByTopicRating(
                        this.props.topicFilter,
                        this.props.starFilter
                      )
                    )
                    .sort(sortByTopicRating(this.props.topicFilter))
                    .map((review, index) => (
                      <ReviewView
                        key={index}
                        review={review}
                        reviewId={review._id}
                        loggedInUserId={this.props.loggedInUserId}
                      />
                    ))}
                </div>
              )}
            </div>
            {this.props.loggedIn ? (
              <div>
                {this.props.writeReview ? (
                  <button
                    className="ui negative button"
                    onClick={this.props.WriteReviewHide}
                  >
                    hide writing a review
                  </button>
                ) : (
                  <button
                    className="ui positive button"
                    onClick={this.props.WriteReviewShow}
                  >
                    write a review
                  </button>
                )}
              </div>
            ) : (
              []
            )}
            <button className="ui button" onClick={this.props.Minify}>
              collapse restaurant
            </button>
          </div>
        )}

        {this.props.writeReview ? (
          <RestaurantReview
            currentUser={this.props.currentUser}
            restaurant={this.props.restaurant.name}
            loggedInUserId={this.props.loggedInUserId}
          />
        ) : (
          []
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    restaurant: props.restaurant,
    currentUser: props.currentUser,
    minify: state["restaurantView"].get("minify"),
    writeReview: state["restaurantView"].get("writeReview"),
    loggedIn: state["app"].get("loggedIn"),
    userId: state["app"].get("userId"),
    loggedInUserId: props.loggedInUserId,
    reviewTimeSort: state["restaurantView"].get("reviewTimeSort"),
    sortBy: state["restaurantView"].get("sortBy"),
    topicFilter: state["restaurantView"].get("topicFilter"),
    starFilter: state["restaurantView"].get("starFilter"),
    daysFilter: state["restaurantView"].get("daysFilter")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Unminify: restaurantName => {
      dispatch(RestaurantViewActions.Unminify(restaurantName));
    },
    Minify: () => {
      dispatch(RestaurantViewActions.Minify());
    },
    WriteReviewShow: () => {
      dispatch(RestaurantViewActions.WriteReviewShow());
    },
    WriteReviewHide: () => {
      dispatch(RestaurantViewActions.WriteReviewHide());
    },
    ReviewsSortByChange: selection => {
      dispatch(
        RestaurantViewActions.ReviewsSortByChange(selection.target.value)
      );
    },
    ReviewsSortByTimeChange: selection => {
      dispatch(
        RestaurantViewActions.ReviewsSortByTimeChange(selection.target.value)
      );
    },
    ReviewsTopicChange: topic => {
      dispatch(RestaurantViewActions.ReviewsTopicChange(topic.target.value));
    },
    ReviewsStarChange: star => {
      dispatch(RestaurantViewActions.ReviewsStarChange(star.target.value));
    },
    RestaurantDaysFilterChange: filter => {
      dispatch(
        RestaurantViewActions.RestaurantDaysFilterChange(filter.target.value)
      );
    }
  };
};

RestaurantView.propTypes = {
  restaurant: PropTypes.object,
  currentUser: PropTypes.string,
  minify: PropTypes.bool,
  writeReview: PropTypes.bool,
  loggedIn: PropTypes.bool,
  userId: PropTypes.object,
  loggedInUserId: PropTypes.string,
  reviewTimeSort: PropTypes.string,
  sortBy: PropTypes.string,
  topicFilter: PropTypes.string,
  daysFilter: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantView);
