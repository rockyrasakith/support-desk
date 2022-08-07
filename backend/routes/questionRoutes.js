const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getQuestions,
  createQuestion,
} = require("../controllers/questionController");

// Express API routes
router.route("/").get(protect, getQuestions).post(protect, createQuestion);

module.exports = router;
