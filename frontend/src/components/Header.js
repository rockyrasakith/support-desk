import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCode } from "react-icons/ai";
import { IoIosLogIn, IoIosCreate } from "react-icons/io";
import { logoutUser, reset } from "../features/auth/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <AiOutlineCode size={30} style={{ verticalAlign: "middle" }} />
          code_mentor
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <IoIosLogIn size={30} />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <IoIosCreate size={30} />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
