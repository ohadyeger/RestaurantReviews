const RestaurantModel = require("../model/restaurant");
const mongoose = require("mongoose");
const ReviewModel = require("../model/review");
const UserModel = require("../model/user");
module.exports = app => {
  app.get("/api/dev/rest/:name", function(req, res) {
    RestaurantModel.findOne({ name: req.params.name })
      .populate("reviews")
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          res.send(data[0]).end();
        }
      });
  });
  app.get("/api/dev/rests/", function(req, res) {
    RestaurantModel.find()
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })

      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          res.send(data).end();
        }
      });
  });
  app.post("/api/dev/rest/review/:name", function(req, res, next) {
    RestaurantModel.find({ name: req.params.name }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        data.reviews.push(req.body.review); //CHECK!
        res.send(data);
      }
    });
  });
  app.post("/api/dev/rest", function(req, res, next) {
    const newRest = new RestaurantModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      location: req.body.location
    });
    newRest
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};
