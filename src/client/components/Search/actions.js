import { SearchActionsConstants } from "./constants";

function SearchLoad() {
  return {
    type: SearchActionsConstants.SEARCH_LOAD,
    rest_uri: "/api/dev/rests/",
    user_uri: "/api/dev/allusers/"
  };
}
function SearchLoadSuccess(restaurants, users) {
  return {
    type: SearchActionsConstants.SEARCH_LOAD_SUCC,
    restaurants: restaurants,
    users: users
  };
}
function SearchLoadFail(msg) {
  return {
    type: SearchActionsConstants.SEARCH_LOAD_FAIL,
    msg: msg
  };
}
function SearchKeyChange(key) {
  return {
    type: SearchActionsConstants.SEARCH_KEY_CHNGE,
    key: key
  };
}
function SearchKeyLocationChange(location) {
  return {
    type: SearchActionsConstants.SEARCH_KEY_LOCATION_CHNGE,
    location: location
  };
}
function SearchSelectionChange(selection) {
  return {
    type: SearchActionsConstants.SEARCH_SELECT_CHNGE,
    selection: selection
  };
}
function SearchStarChange(stars) {
  return {
    type: SearchActionsConstants.SEARCH_STAR_CHNGE,
    stars: stars
  };
}
function SearchTopicChange(topic) {
  return {
    type: SearchActionsConstants.SEARCH_TOPIC_CHNGE,
    topic: topic
  };
}
function SearchSortChange(sort) {
  return {
    type: SearchActionsConstants.SEARCH_SORT_CHNGE,
    sort: sort
  };
}
function SearchScaleValueChange(scale) {
  return {
    type: SearchActionsConstants.SEARCH_SCALE_CHNGE,
    scale: scale
  };
}

const SearchActions = {
  SearchLoad,
  SearchLoadSuccess,
  SearchLoadFail,
  SearchKeyChange,
  SearchKeyLocationChange,
  SearchSelectionChange,
  SearchStarChange,
  SearchTopicChange,
  SearchSortChange,
  SearchScaleValueChange
};

export default SearchActions;
