import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Button";

function Header() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar flex justify-between bg-base-100 shadow-md p-4  items-center">
      <div>
        <Link to="/matches" className="btn btn-ghost normal-case text-3xl">
          🎮 Chi Fou Mi
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center gap-4 text-2xl ">
          <li>
            <Link to="/matches">Matches</Link>
          </li>
          {token ? (
            <li>
              <Button variant="error" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Link to="/">
                <Button variant="primary">Login</Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
