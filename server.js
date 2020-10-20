const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/architecture",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.get("/api/book", (req, res) => {
  db.Book.find({}).then((foundBooks) => {
    res.json(foundBooks);
  });
});

app.get("/api/book/:id", (req, res) => {
  db.Book.find({ _id: req.params.id }).then((foundBook) => {
    res.json(foundBook);
  });
});

app.post("/api/book", (req, res) => {
  db.Book.create(req.body).then((newBook) => {
    res.json(newBook);
  });
});

app.put("/api/book/:id", (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBook) => {
      res.json(updatedBook);
    }
  );
});

app.delete("/api/book/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost${PORT}`);
});
