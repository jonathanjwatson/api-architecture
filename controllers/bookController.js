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
      const newBook = {
        title: req.body.title,
        pages: req.body.pages,
        author: req.body.author,
        creatorId: decoded._id,
      };
      db.Book.create(newBook).then((newBook) => {
        res.json(newBook);
      });
    }
  });
});

router.put("/:id", (req, res) => {
    // To update a book, you must pass in an authorization header. 
    // If no authorization header is provided, return 401. 
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: true,
      data: null,
      message: "Unauthorized.",
    });
  }
  // If jwt is provided as an authorization header, make sure it is valid. 
  jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
      // If jwt is invalid (for any reason) return 401.
    if (err) {
      console.log(err);
      return res.status(401).json({
        error: true,
        data: null,
        message: "Invalid token.",
      });
    } else {
        // If jwt is valid, pull the allowable fields from the body and update the book. 
      console.log(decoded);
      const updatedBook = {
        title: req.body.title,
        pages: req.body.pages,
        author: req.body.author,
      };
      // Restrict updates where the creatorId is equal to the user-provided token _id.
      db.Book.findOneAndUpdate(
        { _id: req.params.id, creatorId: decoded._id },
        updatedBook,
        { new: true }
      )
        .then((updatedBook) => {
            if(!updatedBook){
                res.status(404).json({
                    error: true,
                    data: null,
                    message: "Unable to find that book."
                })
            }else{
                res.json({
                    error: false,
                    data: updatedBook,
                    message: "Successfully updated book."
                });
            }
          
        })
        .catch((err) => {
          res.status(500).json({
            error: true,
            data: null,
            message: "An error occurred updating your book.",
          });
        });
    }
  });
});

router.delete("/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
