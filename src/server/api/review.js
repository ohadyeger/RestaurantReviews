const ReviewModel = require("../model/review");
const UserModel = require("../model/user");
const RestaurantModel = require("../model/restaurant");
const mongoose = require("mongoose");

module.exports = app => {
  app.get("/api/dev/review/:id", function(req, res) {
    ReviewModel.findOne({ _id: req.params.id })
      .populate("reviewer")
      .populate({
        path: "reviewer",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .populate("restaurant")
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
  app.delete("/api/dev/review/:id", function(req, res) {
    ReviewModel.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.send(data);
      }
    });
  });
  app.get("/api/dev/reviewbyuser/:username", function(req, res) {
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          ReviewModel.find({ reviewer: data })
            .populate("reviewer")
            .populate("restaurant")
            .exec((err, data) => {
              if (err) {
                res.status(500).json({
                  error: err
                });
              } else {
                res.send(data);
              }
            });
        }
      });
  });
  app.post("/api/dev/reviewedit/:id", function(req, res, next) {
    const { pictures, rating } = req.body;
    ReviewModel.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        data.pictures = pictures;
        data.rating = rating;
        data.save();
        res.json(data).end();
      }
    });
  });
  app.post("/api/dev/review", function(req, res, next) {
    const { reviewer, restaurant, pictures, rating } = req.body;
    UserModel.findOne({ username: reviewer }, (err, userData) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        RestaurantModel.findOne({ name: restaurant }, (err, restData) => {
          if (err) {
            res.status(500).json({
              error: err
            });
          } else {
            const now = new Date();
            const newReview = new ReviewModel({
              _id: new mongoose.Types.ObjectId(),
              reviewer: userData._id,
              restaurant: restData._id,
              pictures: pictures,
              rating: rating,
              creationDate: now
            });
            newReview
              .save()
              .then(result => {
                res.send(result);
                userData.reviews.push(newReview._id);
                restData.reviews.push(newReview._id);
                userData.save();
                restData.save();
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
  });
};
