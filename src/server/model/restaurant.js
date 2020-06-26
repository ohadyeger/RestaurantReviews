const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  location: {
    type: { description: String, lat: Number, lng: Number },
    default: null
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "ReviewModel" }]
});
module.exports = mongoose.model("RestaurantModel", restaurantSchema);
