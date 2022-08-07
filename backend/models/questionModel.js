const mongoose = require("mongoose");

// Question Schema created with the mongoose ODM.
const questionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    language: {
      type: String,
      required: [true, "Please select a language"],
      enum: ["HTML", "CSS", "JavaScript", "Solidity"],
    },
    description: {
      type: String,
      required: [true, "Describe the issue and Problem"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "answered", "accepted"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
