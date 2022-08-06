import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCode } from "react-icons/ai"; 
import { IoIosLogIn, IoIosCreate } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <AiOutlineCode size={30} style={{ verticalAlign: "middle" }} />
          code_mentor
        </Link>
      </div>
      <ul>
        <li>
            <Link to="/login">
                <IoIosLogIn size={30}/>Login
            </Link>
        </li>
        <li>
        <Link to="/register">
                <IoIosCreate size={30}/>Register
            </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
