import axios from "axios";

const API_URL = "/api/questions/";

// get question notes
const getNotes = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + questionId + "/notes", config);
  console.log(response.data);
  return response.data;
};

// Create ticket note
const createNote = async (noteText, questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + questionId + "/notes",
    {
      text: noteText,
    },
    config
  );

  return response.data;
};

const noteService = { getNotes, createNote };

export default noteService;
