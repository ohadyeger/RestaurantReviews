const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  location: {
    type: { description: String, lat: Number, lng: Number },
    default: null
  },
  picture: {
    type: { name: String, data: String, contentType: String },
    default: null
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "ReviewModel" }]
});
module.exports = mongoose.model("UsersModel", userSchema);
