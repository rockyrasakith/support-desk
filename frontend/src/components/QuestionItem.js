import React from "react";
import { Link } from "react-router-dom";

const QuestionItem = ({ question }) => {
  return (
    <div className="ticket">
      <div>{new Date(question.createdAt).toLocaleString("en-US")}</div>
      <div>{question.language}</div>
      <div className={`status status-${question.status}`}>
        {question.status}
      </div>
      <Link to={`/question/${question._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default QuestionItem;
