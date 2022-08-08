const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// reroute into note router
const noteRouter = require("./noteRoutes")
router.use("/:questionId/notes/", noteRouter)

// Express API routes
router.route("/").get(protect, getQuestions).post(protect, createQuestion);

// param routes and API to handling individual questions
router
  .route("/:id")
  .get(protect, getQuestion)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
