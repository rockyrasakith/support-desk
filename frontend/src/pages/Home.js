import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { ImEye } from "react-icons/im";

const Home = () => {
  
  return (
    <>
      <section className="heading">
        <h1>Which programming language do you need help with?</h1>
      </section>
     
        <>
          <Link
            to="/new-question"
            className="btn btn-reverse btn-block"
            style={{ backgroundColor: "green" }}
          >
            <FaQuestionCircle /> Ask a new question
          </Link>
          <Link
            to="/questions"
            className="btn btn-block"
            style={{ backgroundColor: "blue" }}
          >
            <ImEye /> View my questions
          </Link>
        </>
  
    </>
  );
};

export default Home;
