const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  // Check for user-provided token.
  // If token, decode it.
  // If valid token, find books.
  // Else 401
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: true,
      data: null,
      message: "Unauthorized.",
    });
  }
  jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
      console.log(decoded);

      db.Book.find({})
        .populate("author", "firstName lastName")
        .then((foundBooks) => {
          res.json(foundBooks);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Failed to retrieve all books.",
          });
        });
    }
  });
});

router.get("/:id", (req, res) => {
  db.Book.find({ _id: req.params.id }).then((foundBook) => {
    res.json(foundBook);
  });
});

router.post("/", (req, res) => {
  db.Book.create(req.body).then((newBook) => {
    res.json(newBook);
  });
});

router.put("/:id", (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBook) => {
      res.json(updatedBook);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
