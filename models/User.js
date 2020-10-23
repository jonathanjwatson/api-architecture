const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    emailAddress: {
      type: String,
      trim: true,
      required: "Email address is required",
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required",
    },
    firstName: {
      type: String,
      trim: true,
      required: "First name is required",
    },
    lastName: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
