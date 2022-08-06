import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const { name, email, password, passwordconfirm } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordconfirm) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(registerUser(userData))
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create new account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              autoComplete="off"
              required
            />
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              autoComplete="on"
              required
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter a password"
              autoComplete="off"
              required
            />
            <input
              type="password"
              className="form-control"
              id="passwordconfirm"
              name="passwordconfirm"
              value={passwordconfirm}
              onChange={onChange}
              placeholder="Confirm the password"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Create Account</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
