const express = require("express");
const router = express.Router();
const db = require("../models")

router.get("/", (req, res) => {
  db.Book.find({}).then((foundBooks) => {
    res.json(foundBooks);
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
