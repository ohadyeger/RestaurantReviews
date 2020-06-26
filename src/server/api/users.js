const UserModel = require("../model/user");
const mongoose = require("mongoose");

module.exports = app => {
  app.get("/api/dev/allusers/", function(req, res) {
    UserModel.find()
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else {
          res.send(data).end();
        }
      });
  });
  app.get("/api/dev/users/logout", function(req, res) {
    res
      .cookie("name", "", { overwrite: true })
      .cookie("id", "", { overwrite: true })
      .cookie("location", undefined, {
        overwrite: true
      })
      .send({ msg: "logout successful" })
      .end();
  });
  app.get("/api/dev/users/validate/:username", function(req, res) {
    UserModel.find({ username: req.params.username }, (err, data) => {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        res.send(data).end();
      }
    });
  });
  app.get("/api/dev/loaduser/:username", function(req, res, next) {
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else {
          res.send(data).end();
        }
      });
  });
  app.get("/api/dev/users/:username", function(req, res, next) {
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else if (data) {
          res
            .cookie("name", data.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .cookie("location", JSON.stringify(data.location), {
              overwrite: true
            })
            .send(data)
            .end();
        } else {
          res.status(500).send({
            error: "An error occured in the server"
          });
        }
      });
  });
  app.post("/api/dev/userschange/:username", function(req, res, next) {
    const clientName = req.cookies["name"];
    UserModel.findOne({ username: req.params.username })
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "restaurant",
          model: "RestaurantModel"
        }
      })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewer",
          model: "UsersModel"
        }
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else if (!data || err || clientName === "") {
          res.status(500).send({
            error: err
          });
        } else {
          if (req.body.username) {
            data.username = req.body.username;
          }
          if (req.body.location) {
            data.location = req.body.location;
          }
          data.save();

          res
            .cookie("name", req.body.username, { overwrite: true })
            .cookie("id", JSON.stringify(data._id), { overwrite: true })
            .cookie("location", JSON.stringify(req.body.location), {
              overwrite: true
            })
            .send(data)
            .end();
        }
      });
  });

  app.post("/api/dev/users", function(req, res, next) {
    const { username, location, picture } = req.body;
    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      location: location,
      picture: picture
    });
    newUser
      .save()
      .then(result => {
        res.send(result).end();
      })
      .catch(err => {
        res.status(500).send({
          error: err
        });
      });
  });
  app.delete("/api/dev/users/:username", function(req, res, next) {
    UserModel.findOneAndDelete({ username: req.params.username }).exec(
      (err, data) => {
        if (err) {
          res.status(500).send({
            error: err
          });
        } else {
          if (req.cookies["name"] == req.params.username) {
            res
              .cookie("name", "")
              .status(200)
              .send({ msg: "User was deleted" })
              .end();
          } else {
            res
              .status(200)
              .send({ msg: "User was deleted" })
              .end();
          }
        }
      }
    );
  });
};
