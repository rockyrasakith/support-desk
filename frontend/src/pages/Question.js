import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuestion,
  closeQuestion,
} from "../features/questions/questionSlice";
import { getNotes, reset as notesReset, createNote } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement('#root')

const Question = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { question, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.question
  );

  console.log("question", question);

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  );

  console.log("notes: ", notes);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getQuestion(questionId));
    dispatch(getNotes(questionId));
  }, [isError, message, questionId]);

  
  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, questionId }))
    closeModal()
  }
  
  // Close ticket
  const onTicketClose = () => {
    dispatch(closeQuestion(questionId));
    toast.success("Question marked answered");
    navigate("/questions");
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/questions" />
        <h2>
          Question ID: {question._id}
          <span className={`status status-${question.status}`}>
            {question.status}
          </span>
        </h2>
        <h3>
          Date Asked: {new Date(question.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Programming Language: {question.language}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Question</h3>
          <p>{question.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {question.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {question.status !== "accepted" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Accept Answer
        </button>
      )}
    </div>
  );
};

export default Question;
