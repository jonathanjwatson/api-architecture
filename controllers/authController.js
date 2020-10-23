const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../models");

// Sign UP

router.post("/api/signup", (req, res) => {
    const {emailAddress, password} = req.body
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

module.exports = router;
