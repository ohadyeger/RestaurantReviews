import React from "react";
import RestaurantView from "../RestaurantView/RestaurantView";
import UserView from "../UserView/UserView";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import { Search as UiSearch } from "semantic-ui-react";

const SearchBar = props => {
  const getFilteredResults = (restMap, userMap) =>
    props.selection == "restaurants"
      ? props.RestaurantMinify
        ? props.restaurants
            .filter(
              restaurant =>
                restaurant.name
                  .toLowerCase()
                  .startsWith(props.searchKey.toLowerCase()) &&
                (!props.searchKeyLocation ||
                  (props.searchKeyLocation &&
                    restaurant.location.description
                      .toLowerCase()
                      .startsWith(props.searchKeyLocation.toLowerCase()))) &&
                averageScoreFilter(restaurant, props.starFilter)
            )
            .sort(closerBetterSort(props.scaleValue, props.currentLocation))
            .map(restMap)
        : props.restaurants
            .filter(restaurant => restaurant.name == props.restaurantName)
            .sort(closerBetterSort(props.scaleValue, props.currentLocation))
            .map(restMap)
      : props.userMinify
      ? props.users
          .filter(
            user =>
              user.username &&
              user.username
                .toLowerCase()
                .startsWith(props.searchKey.toLowerCase()) &&
              user.location.description
                .toLowerCase()
                .startsWith(props.searchKeyLocation.toLowerCase())
          )
          .map(userMap)
      : props.users
          .filter(user => user.username == props.username)
          .map(userMap);

  const searchFor = (
    <div>
      Search for:
      <select
        className="ui selection dropdown"
        value={props.selection}
        onChange={props.SearchSelectionChange}
      >
        <option value="users">users</option>
        <option value="restaurants">restaurants</option>
      </select>
    </div>
  );

  const advancedSearch = (
    <div className="ui search">
      Advanved Search:
      <UiSearch
        placeholder="Search By Name"
        onResultSelect={(e, { result }) => props.SearchTitleSelected(result)}
        onSearchChange={props.SearchKeyChange}
        results={getFilteredResults(
          rest => ({
            title: rest.name
          }),
          user => ({
            title: user.username
          })
        )}
        value={props.searchKey}
      />
      <input
        className="prompt"
        onChange={props.SearchKeyLocationChange}
        placeholder="Search By Location"
      />
      {props.selection == "restaurants" ? (
        <div className="ui four column grid">
          <div className="row">
            <div className="column" />
            <div className="column">
              closer - better
              <InputRange
                maxValue={100}
                minValue={0}
                value={props.scaleValue}
                onChange={props.SearchScaleValueChange}
              />
            </div>
            <div className="column">
              <select
                className="ui selection dropdown"
                value={props.starFilter}
                onChange={props.SearchStarChange}
              >
                <option value="0">Over 0 stars</option>
                <option value="1">Over 1 star</option>
                <option value="2">Over 2 stars</option>
                <option value="3">Over 3 stars</option>
                <option value="4">Over 4 stars</option>
              </select>
            </div>
          </div>
          <div className="row" />
        </div>
      ) : (
        []
      )}
    </div>
  );

  const showResults = (
    <div>
      {getFilteredResults(
        (restaurant, index) => (
          <RestaurantView
            key={index}
            restaurant={restaurant}
            currentUser={props.currentUser}
            loggedInUserId={props.loggedInUserId}
          />
        ),
        (user, index) => (
          <UserView
            key={index}
            user={user}
            loggedInUserId={props.loggedInUserId}
          />
        )
      )}
    </div>
  );
  return {
    getFilteredResults,
    searchFor,
    advancedSearch,
    showResults
  };
};

const reviewScoreAverage = review =>
  [
    review.rating["bathroomQuality"],
    review.rating["cleanliness"],
    review.rating["deliverySpeed"],
    review.rating["driveThruQuality"],
    review.rating["foodQuality"],
    review.rating["staffKindness"]
  ].reduce((p, c) => (p += c), 0) / 6;

const restScoreAverage = rest =>
  rest.reviews.length
    ? rest.reviews.map(reviewScoreAverage).reduce((p, c) => (p += c), 0) /
      rest.reviews.length
    : 0;

const compareRestByScore = (rest1, rest2) =>
  (restScoreAverage(rest2) - restScoreAverage(rest1)) / 5;

const compareRestByDistance = myLocation => (rest1, rest2) => {
  const x_r1 = rest1.location.lat;
  const y_r1 = rest1.location.lng;
  const x2 = myLocation.lat;
  const y2 = myLocation.lng;
  const d1 = Math.sqrt(Math.pow(x2 - x_r1, 2) + Math.pow(y2 - y_r1, 2));
  const x1_r2 = rest2.location.lat;
  const y1_r2 = rest2.location.lat;
  const d2 = Math.sqrt(Math.pow(x2 - x1_r2, 2) + Math.pow(y2 - y1_r2, 2));

  return (d2 - d1) / (d1 + d2);
};
const averageScoreFilter = (rest, score) => restScoreAverage(rest) >= score;

const closerBetterSort = (scale, myLocation) => (rest1, rest2) =>
  (100 - scale) * compareRestByDistance(myLocation)(rest1, rest2) +
  scale * compareRestByScore(rest1, rest2);

export default SearchBar;
