import React, { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import { logout } from "../utils/actions";
const logo = require("../img SongSurfer.png"); // change img source

const Header = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuStatus, setMenuStatus] = useState(false);
    const logout = props.location.state?.logout;

    useEffect(() => {
        if (logout) localStorage.removeItem("token");
        if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [logout]);
    
      const toggleMenu = () => setMenuStatus(!menuStatus);
      return (
        <div className="header-container">
          <div className="header-top">
            <div className="image-container">
              <Link to="/">
                <img className="logo" src={logo} />
              </Link>
            </div>
            <div className="header-links-container">
              <div className="header-links">
                {isLoggedIn ? (
                  <React.Fragment>
                    <i onClick={toggleMenu} className="fas fa-user-circle"></i>
                    {menuStatus && (
                      <div style={{ position: "absolute" }}>
                        <div className="links-wrapper">
                          <Link to="/favorites">Favorites</Link>
                          <Link to="/myprofile">Profile</Link>
                          <Link
                            to={{
                              pathname: "/",
                              state: { logout: true }
                            }}
                            onClick={() => props.logout()}
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="header-title"></div>
        </div>
      );
    };
    export default connect(null, { logout })(withRouter(Header));