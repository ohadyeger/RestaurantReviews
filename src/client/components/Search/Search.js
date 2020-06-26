import React from "react";
import { connect } from "react-redux";
import SearchActions from "./actions";
import PropTypes from "prop-types";
import { Search as UiSearch } from "semantic-ui-react";
import SearchBar from "./searchBar";

class Search extends React.Component {
  render() {
    const {
      getFilteredResults,
      searchFor,
      advancedSearch,
      showResults
    } = SearchBar(this.props);

    return (
      <div>
        {/* <UiSearch
          onResultSelect={(e, { result }) =>
            this.props.SearchTitleSelected(result)
          }
          onSearchChange={this.props.SearchKeyChange}
          results={getFilteredResults(
            rest => ({
              title: rest.name
            }),
            user => ({
              title: user.username
            })
          )}
          value={this.props.searchKey}
        /> */}

        {searchFor}
        {advancedSearch}
        {showResults}

        <button className="ui button" onClick={this.props.SearchLoad}>
          Load Restaurants and Users
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    restaurants: state["search"].get("restaurants"),
    users: state["search"].get("users"),
    searchKey: state["search"].get("searchKey"),
    searchKeyLocation: state["search"].get("searchKeyLocation"),
    selection: state["search"].get("selection"),
    currentUser: props.currentUser,
    RestaurantMinify: state["restaurantView"].get("minify"),
    restaurantName: state["restaurantView"].get("restaurantName"),
    username: state["userView"].get("username"),
    userMinify: state["userView"].get("minify"),
    starFilter: state["search"].get("starFilter"),
    currUserLocation: state["app"].get("location"),
    loggedInUserId: props.loggedInUserId,
    scaleValue: state["search"].get("scaleValue"),
    currentLocation: props.currentLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SearchLoad: () => {
      dispatch(SearchActions.SearchLoad());
    },
    SearchKeyChange: key => {
      dispatch(SearchActions.SearchKeyChange(key.target.value));
    },
    SearchTitleSelected: result => {
      dispatch(SearchActions.SearchKeyChange(result.title));
    },
    SearchKeyLocationChange: location => {
      dispatch(SearchActions.SearchKeyLocationChange(location.target.value));
    },
    SearchSelectionChange: selection => {
      dispatch(SearchActions.SearchSelectionChange(selection.target.value));
    },
    SearchStarChange: stars => {
      dispatch(SearchActions.SearchStarChange(stars.target.value));
    },
    SearchScaleValueChange: scale => {
      dispatch(SearchActions.SearchScaleValueChange(scale));
    }
  };
};

Search.propTypes = {
  restaurants: PropTypes.array,
  users: PropTypes.array,
  searchKey: PropTypes.string,
  searchKeyLocation: PropTypes.string,
  selection: PropTypes.string,
  currentUser: PropTypes.string,
  RestaurantMinify: PropTypes.bool,
  restaurantName: PropTypes.string,
  username: PropTypes.string,
  userMinify: PropTypes.bool,
  currUserLocation: PropTypes.object,
  loggedInUserId: PropTypes.string,
  currentLocation: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
