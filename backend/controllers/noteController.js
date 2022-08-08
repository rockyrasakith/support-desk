const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");
const Question = require("../models/questionModel");
const Note = require("../models/noteModel");

// @desc     Get notes for a question
// @route    GET /api/questions/:questionId/notes
// @access   Private
const getNotes = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const question = await Question.findById(req.params.questionId);

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ question: req.params.questionId });

  res.status(200).json(notes);
});


// @desc     Create question note
// @route    POST /api/questions/:questionId/notes
// @access   Private
const addNote = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const question = await Question.findById(req.params.questionId);

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await Note.create({ 
    question: req.params.questionId,
    text: req.body.text, 
    isStaff: false,
    user: req.user.id
});

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote
};
