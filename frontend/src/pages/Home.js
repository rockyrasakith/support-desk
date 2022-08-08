import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import Typical from "react-typical";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <section className="heading">
        <h1>Which programming language do you need help with?</h1>
        {!user && (
          <div
            style={{
              fontFamily: "courier new",
              margin: "20px",
              fontSize: "1.2em",
              fontWeight: "bold",
              color: "#e74c3c",
            }}
          >
            <Typical
              steps={[
                "<html> Hello World </html>",
                2000,
                `css {hello: 
            world} `,
                2000,
                `JavaScript.log("Hello World")`,
                2000,
              ]}
              loop={3}
              wrapper="p"
            />
          </div>
        )}
      </section>
      {user && (
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
      )}
    </>
  );
};

export default Home;
