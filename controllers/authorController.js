const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Author.find({})
    .populate("books")
    .then((foundAuthors) => {
      res.json(foundAuthors);
    });
});

router.get("/:id", (req, res) => {
  db.Author.find({ _id: req.params.id }).then((foundAuthor) => {
    res.json(foundAuthor);
  });
});

router.post("/", (req, res) => {
  db.Author.create(req.body).then((newAuthor) => {
    res.json(newAuthor);
  });
});

router.put("/:id", (req, res) => {
  db.Author.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedAuthor) => {
      res.json(updatedAuthor);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.Author.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
