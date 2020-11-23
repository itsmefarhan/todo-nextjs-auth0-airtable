import React from "react";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Todo
        </a>

        <ul className="navbar-nav ml-auto">
          {user ? (
            <li className="nav-item">
              <a className="nav-link" href="/api/logout">
                Logout
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/api/login">
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
