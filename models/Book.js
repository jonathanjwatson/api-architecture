const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required"
  },
  pages: {
    type: Number,
    required: true
  },
  author: {
      type: String,
      trim: true,
      required: "Author is required"
  }


});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;