const { List, Map } = require("immutable");

export default {
  app: Map({}),
  register: Map({
    username: "",
    picture: null,
    location: null,
    currentlySending: false,
    error: null,
    registerComplete: false,
    userValid: true,
    modalIsOpened: false
  }),
  LoginPage: Map({
    username: "",
    picture: null,
    location: null,
    loggedIn: false,
    user: null
  }),
  RestaurantReview: Map({
    stars: [1, 1, 1, 0, 0, 1],
    pictures: [],
    currentPicture: null
  }),
  ReviewEdit: Map({
    stars: [0, 0, 0, 0, 0, 0],
    pictures: [],
    currentPicture: null,
    review: null,
    minimize: true,
    reviewId: ""
  }),
  Restaurant: Map({
    name: "",
    location: null,
    reviews: []
  }),
  SearchRestaurant: Map({
    restaurants: [],
    searchKey: ""
  }),
  SearchUser: Map({}),
  Search: Map({
    restaurants: [],
    users: [],
    searchKey: "",
    searchKeyLocation: "",
    selection: "restaurants",
    starFilter: 0,
    scaleValue: 100
  }),
  ReviewView: Map({
    review: null,
    minify: true,
    reviewId: ""
  }),
  UserEdit: Map({
    username: "",
    picture: null,
    location: null,
    currentlySending: false,
    error: null,
    registerComplete: false,
    userValid: true,
    user: null,
    modalIsOpened: false
  }),
  UserView: Map({
    minify: true,
    username: ""
  }),
  restaurantView: Map({
    minify: true,
    writeReview: false,
    restaurantName: null,
    reviewTimeSort: "oldest",
    sortBy: "topic",
    topicFilter: "any",
    starFilter: 0,
    daysFilter: "allTime"
  })
};
