import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>Which topic do you need help with?</h1>
        <p>Choose an option below</p>
      </section>

      <Link to="/new-question" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Ask a new question
      </Link>
      <Link to="/questions" className="btn btn-block">
        <FaTicketAlt /> View my questions
      </Link>
    </>
  );
};

export default Home;
