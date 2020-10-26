const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../models");

// Sign UP

router.post("/api/signup", (req, res) => {
  const { emailAddress, password } = req.body;
  console.log(emailAddress);
  console.log(password);
  if (!emailAddress.trim() || !password.trim()) {
    res.status(400);
  } else {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        console.log(hashedPassword);
        db.User.create({
          emailAddress: emailAddress,
          password: hashedPassword,
        })
          .then((newUser) => {
            res.json(newUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to signup.",
            });
          });
      })
      .catch((err) => {
        res.status(500);
      });
  }
});

// Login

router.post("/api/login", (req, res) => {
  const { emailAddress, password } = req.body;
  db.User.findOne({ emailAddress: emailAddress })
    .then((foundUser) => {
      if (foundUser) {
        console.log(foundUser);
        console.log("Hashed password from DB", foundUser.password);
        console.log("Plain text password from user", password);
        bcrypt
          .compare(password, foundUser.password)
          .then(function (result) {
            // result == true
            console.log("The passwords match: ", result);
            if (result) {
              // TODO: send a jwt back as data instead.
              res.json({
                error: false,
                data: null,
                message: "Successfully logged in.",
              });
            } else {
              res.status(401).json({
                error: true,
                data: null,
                message: "Failed to sign in.",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              error: true,
              data: null,
              message: "Failed to sign in.",
            });
          });
      }
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to sign in.",
      });
    });
});

module.exports = router;
