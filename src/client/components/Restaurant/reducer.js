import { RestaurantActionsConstants } from "./constants";
import initialState from "../../initialState";

const RestaurantReducer = (state = initialState.Restaurant, action) => {
  switch (action.type) {
    case RestaurantActionsConstants.RESTAURANT_NAME_CHNGE:
      state = state.set("name", action.name);
      return state;
    case RestaurantActionsConstants.RESTAURANT_LOCT_CHNGE:
      if (action.location) {
        const { lat, lng } = action.location.location;
        state = state.set("location", {
          description: action.location.description,
          lat: lat,
          lng: lng
        });
      }
      return state;
    default:
      return state;
  }
};

export default RestaurantReducer;
