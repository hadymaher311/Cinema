import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import { Navbar, Nav } from "react-bootstrap";

function Layout(props) {
  const handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    props.logout();
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Cinema</Navbar.Brand>
        <Nav className="mr-auto">
          {props.loggedIn && !props.is_admin ? (
            <React.Fragment>
              <Nav.Link href="/movies">All Movies</Nav.Link>
            </React.Fragment>
          ) : (
            ""
          )}
          {props.loggedIn && props.is_admin ? (
            <React.Fragment>
              <Nav.Link href="/admin/users">Users</Nav.Link>
            </React.Fragment>
          ) : (
            ""
          )}
        </Nav>
        <Nav>
          {!props.loggedIn ? (
            <Fragment>
              <Link className="py-1 px-2 text-white" to="/login">
                Login
              </Link>
              <Link className="py-1 px-2 text-white" to="/register">
                Register
              </Link>
            </Fragment>
          ) : (
            <Link
              className="py-1 px-2 text-white"
              to="/logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </Nav>
      </Navbar>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    is_admin: state.auth.user.is_admin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () =>
      dispatch({
        type: "SET_LOGOUT"
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
