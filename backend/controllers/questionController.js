const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");
const Question = require("../models/questionModel");

// @desc     Get User Question
// @route    GET /api/questions
// @access   Private
const getQuestions = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get questions" });
});

// @desc     Create new Question
// @route    POST /api/questions
// @access   Private
const createQuestion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create new question" });
});

module.exports = { getQuestions, createQuestion };
