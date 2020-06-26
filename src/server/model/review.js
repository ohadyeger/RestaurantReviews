const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    reviewer: { type: Schema.Types.ObjectId, ref: "UsersModel" },
    restaurant: { type: Schema.Types.ObjectId, ref: "RestaurantModel" },
    pictures: {
      type: [{ name: String, data: String, contentType: String }],
      default: []
    },
    rating: {
      type: {
        bathroomQuality: Number,
        staffKindness: Number,
        cleanliness: Number,
        driveThruQuality: Number,
        deliverySpeed: Number,
        foodQuality: Number
      },
      default: null,
      creationDate: Date
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("ReviewModel", reviewSchema);
