const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");
const Question = require("../models/questionModel");

// @desc     Get all Questions
// @route    GET /api/questions
// @access   Private
const getQuestions = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const questions = await Question.find({ user: req.user.id });
  res.status(200).json(questions);
});

// @desc     Get Single Question
// @route    GET /api/questions/:id
// @access   Private
const getQuestion = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(question);
});

// @desc     Delete Single Question
// @route    DELETE /api/questions/:id
// @access   Private

const deleteQuestion = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await question.remove();

  res.status(200).json({ success: true });
});

// @desc     Update the Responses
// @route    PUT /api/questions/:id
// @access   Private
const updateQuestion = asyncHandler(async (req, res) => {
  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Get the question
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (question.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedQuestion);
});

// @desc     Create new Question
// @route    POST /api/questions
// @access   Private
const createQuestion = asyncHandler(async (req, res) => {
  const { language, description } = req.body;

  if (!language || !description) {
    res.status(400);
    throw new Error("Add a language and description");
  }

  // Get the user using id and jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const question = await Question.create({
    language,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(question);
});

module.exports = {
  getQuestions,
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
};
