import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newQuestion, reset } from "../features/questions/questionSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewQuestion = () => {
  const { user } = useSelector((state) => state.auth);
  const { name, email } = user;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.question
  );

  const [language, setlanguage] = useState("HTML");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/questions");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newQuestion({ language, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <BackButton url="/" />
      <section className="heading">
        <h1>Ask a New Question</h1>
        <p>Get help with your coding skills</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input type="text" className="form-contrl" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Student Email</label>
          <input type="text" className="form-contrl" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="language">Programming Language</label>
            <select
              name="language"
              id="language"
              value={language}
              onChange={(e) => {
                setlanguage(e.target.value);
              }}
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Solidity">Solidity</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Question</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              placeholder="Start typing your coding question..."
              rows={10}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group" style={{ paddingBottom: "45px" }}>
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewQuestion;
