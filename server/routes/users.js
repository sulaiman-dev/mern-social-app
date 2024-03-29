const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findOne } = require("../models/User");
const User = require("../models/User");

// router.get("/", (req, res) => {
//     res.send("hey its users route")
// })

//update user
router.put("/:id", async (req, res) => {
  if (
    req.body.userId === req.params.id ||
    req.body.isAdmin
  ) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(
          req.body.password,
          salt
        );
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        }
      );
      res.status(200).json("Accont has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("you can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (
    req.body.userId === req.params.id ||
    req.body.isAdmin
  ) {
    try {
      const user = await User.findByIdAndDelete(
        req.params.id
      );
      res
        .status(200)
        .json("Accont has been deleted successfully!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("you can delete only your account!");
  }
});
//get a user
// router.get("/:id", async (req, res) => {
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? //  await User.findById(req.params.id):
        await User.findById(userId)
      : await User.findOne({ username: username });
    // res.status(200).json(user);
    // in case we don't need all properties of the user to send to the client
    const { password, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(404).json("user not found!");
  }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(
        req.body.userId
      );
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        res.status(200).json("user has been followed!");
      } else {
        res
          .status(403)
          .json("you are already following this user!");
      }
    } catch (err) {
      console.log("inside catch", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can not follow yourself");
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(
        req.body.userId
      );
      if (user.followers.includes(req.body.userId)) {
        console.log("inside try");
        await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({
          $pull: { followings: req.body.userId },
        });
        res.status(200).json("user has been unfollowed!");
      } else {
        res.status(403).json("you don't follow this user!");
      }
    } catch (err) {
      console.log("inside catch", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can not unfollow yourself");
  }
});
module.exports = router;
