import { SearchActionsConstants } from "./constants";
import initialState from "../../initialState";

const SearchReducer = (state = initialState.Search, action) => {
  switch (action.type) {
    case SearchActionsConstants.SEARCH_LOAD_SUCC:
      state = state.set("restaurants", action.restaurants);
      state = state.set("users", action.users);
      return state;
    case SearchActionsConstants.SEARCH_LOAD_FAIL:
      return state;
    case SearchActionsConstants.SEARCH_KEY_CHNGE:
      state = state.set("searchKey", action.key);
      return state;
    case SearchActionsConstants.SEARCH_KEY_LOCATION_CHNGE:
      state = state.set("searchKeyLocation", action.location);
      return state;
    case SearchActionsConstants.SEARCH_SELECT_CHNGE:
      state = state.set("selection", action.selection);
      return state;
    case SearchActionsConstants.SEARCH_STAR_CHNGE:
      state = state.set("starFilter", action.stars);
      return state;
    case SearchActionsConstants.SEARCH_TOPIC_CHNGE:
      state = state.set("topicFilter", action.topic);
      return state;
    case SearchActionsConstants.SEARCH_SORT_CHNGE:
      state = state.set("topicFilter", "any");
      state = state.set("starFilter", 0);
      state = state.set("sortBy", action.sort);
      return state;
    case SearchActionsConstants.SEARCH_SCALE_CHNGE:
      state = state.set("scaleValue", action.scale);
      return state;
    default:
      return state;
  }
};

export default SearchReducer;
