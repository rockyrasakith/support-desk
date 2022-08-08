import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import questionReducer from "../features/questions/questionSlice"
import noteReducer from "../features/notes/noteSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    note: noteReducer
  },
});

