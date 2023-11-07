import React from "react";
import { Link } from "react-router-dom";

export const Navvbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark ">
        <div className="container-fluid">
          <Link to="home" className="navbar-brand text-info" href="#">
            Movies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 list ">
              {props.userData ? (
                <>
                  <li className="nav-item ">
                    <Link
                      to="home"
                      className="nav-link"
                      aria-current="page"
                      href="#"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="movie" className="nav-link" href="#">
                      Movie
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="tv" className="nav-link" href="#">
                      Tv
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="pepole" className="nav-link" href="#">
                      Pepole
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav mx-5 my-3 py-3 mb-lg-0">
              {props.userData ? (
                <li className="nav-item">
                  <span
                    onClick={props.Logout}
                    className="nav-link logout btn btn-outline-danger rounded-4"
                    href="#"
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="login"
                      className="nav-link btn btn-outline-success rounded-4 "
                      aria-current="page"
                      href="#"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="register"
                      className="nav-link btn btn-outline-success rounded-4"
                      href="#"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
