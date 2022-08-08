import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions, reset } from "../features/questions/questionSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import QuestionItem from "../components/QuestionItem";

const Questions = () => {
  const { questions, isLoading, isSuccess } = useSelector(
    (state) => state.question
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <BackButton url="/" />
      <h1>My Questions</h1>
      <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Language</div>
            <div>Status</div>
            <div></div>
        </div>
        {questions.map(question => (
            <QuestionItem key={question._id} question={question}/>
        ))}
      </div>
    </>
  );
};

export default Questions;
