import { RestaurantActionsConstants } from "./constants";

function RestaurantRequest(name, location) {
  return {
    type: RestaurantActionsConstants.RESTAURANT_REQ,
    restaurantDetails: {
      name,
      location
    },
    uri: "/api/dev/rest"
  };
}
function RestaurantRequestSuccess(msg) {
  return {
    type: RestaurantActionsConstants.RESTAURANT_REQ_SUCC,
    msg: msg
  };
}
function RestaurantRequestFail(msg) {
  return {
    type: RestaurantActionsConstants.RESTAURANT_REQ_FAIL,
    msg: msg
  };
}
function RestaurantNameSet(name) {
  return {
    type: RestaurantActionsConstants.RESTAURANT_NAME_CHNGE,
    name: name.target.value
  };
}
function RestaurantLocationSet(location) {
  return {
    type: RestaurantActionsConstants.RESTAURANT_LOCT_CHNGE,
    location: location
  };
}

const RestaurantActions = {
  RestaurantRequest,
  RestaurantRequestSuccess,
  RestaurantRequestFail,
  RestaurantNameSet,
  RestaurantLocationSet
};

export default RestaurantActions;
