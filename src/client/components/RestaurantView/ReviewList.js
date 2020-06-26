const ReviewList = props => (
  <div>
    props.minify ? (
    <div className="ui centered card">
      <div>Name: {props.restaurant.name}</div>
      <button
        className="ui button"
        onClick={() => {
          props.Unminify(props.restaurant.name);
        }}
      >
        expand restuarant
      </button>
    </div>
    ) : (
    <div className="ui centered card ">
      <div className="content">Name: {props.restaurant.name}</div>
      <div className="content">
        Location: {props.restaurant.location.description}
      </div>
      Sort By:
      <select
        className="ui selection dropdown"
        className="ui selection dropdown"
        value={props.sortBy}
        onChange={props.ReviewsSortByChange}
      >
        <option value="date">date</option>
        <option value="topic">topic</option>
      </select>
      {props.sortBy == "date" ? (
        <div>
          <select
            className="ui selection dropdown"
            value={props.reviewTimeSort}
            onChange={props.ReviewsSortByTimeChange}
          >
            <option value="oldest">oldest first</option>
            <option value="newest">newest first</option>
          </select>
          <select
            className="ui selection dropdown"
            value={props.daysFilter}
            onChange={props.RestaurantDaysFilterChange}
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
            value={props.starFilter}
            onChange={props.ReviewsStarChange}
          >
            <option value="0">Over 0 stars</option>
            <option value="1">Over 1 star</option>
            <option value="2">Over 2 stars</option>
            <option value="3">Over 3 stars</option>
            <option value="4">Over 4 stars</option>
          </select>
          <select
            className="ui selection dropdown"
            value={props.topicFilter}
            onChange={props.ReviewsTopicChange}
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
        {props.reviewTimeSort == "oldest" ? (
          <div>
            {props.restaurant.reviews
              .filter(filterByTopicRating(props.topicFilter, props.starFilter))
              .sort(sortByTopicRating(props.topicFilter))
              .map((review, index) => (
                <ReviewView
                  key={index}
                  review={review}
                  reviewId={review._id}
                  loggedInUserId={props.loggedInUserId}
                />
              ))}
          </div>
        ) : (
          <div>
            {props.restaurant.reviews
              .reverse()
              .filter(filterByTopicRating(props.topicFilter, props.starFilter))
              .sort(sortByTopicRating(props.topicFilter))
              .map((review, index) => (
                <ReviewView
                  key={index}
                  review={review}
                  reviewId={review._id}
                  loggedInUserId={props.loggedInUserId}
                />
              ))}
          </div>
        )}
      </div>
      {props.loggedIn ? (
        <div>
          {props.writeReview ? (
            <button onClick={props.WriteReviewHide}>
              hide writing a review
            </button>
          ) : (
            <button className="ui button" onClick={props.WriteReviewShow}>
              write a review
            </button>
          )}
        </div>
      ) : (
        []
      )}
      <button className="ui button" onClick={props.Minify}>
        collapse restaurant
      </button>
    </div>
    );
  </div>
);

{
  props.writeReview ? (
    <RestaurantReview
      currentUser={props.currentUser}
      restaurant={props.restaurant.name}
      loggedInUserId={props.loggedInUserId}
    />
  ) : (
    []
  );
}
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

export default ReviewList;
