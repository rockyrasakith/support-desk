import axios from "axios";

const API_URL = "/api/questions/";

const createQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, questionData, config);
  return response.data;
};

// get all questions
const getQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// get one question
const getQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + questionId, config);
  return response.data;
};

// close question
const closeQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + questionId,
    { status: "accepted" },
    config
  );
  return response.data;
};

const questionService = {
  createQuestion,
  getQuestions,
  getQuestion,
  closeQuestion
};

export default questionService;
