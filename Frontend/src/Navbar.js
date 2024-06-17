import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function Navbar(props) {

    return (
      <nav className = {`navbar navbar-expand-lg fixed-top`} style={{backgroundColor: "rgb(226 226 224 / 95%)"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{filter: "invert(0)"}}>
            {props.title}
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
            <span className="navbar-toggler-icon" style={{filter: "invert(0)"}}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link active" aria-current="page" to="/" >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/entertainment" >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/health" >
                  Health
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/science" >
                  Science
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/sports" >
                  Sports
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/technology" >
                  Technology
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link style={{filter: "invert(0)"}} className="nav-link" aria-current="page" to="/business" >
                  Business
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Navbar",
  about: "About",
};
