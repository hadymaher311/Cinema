import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import { Navbar, Nav, Dropdown } from "react-bootstrap";

function Layout(props) {
  const handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    props.logout();
  };

  return (
    <div>
      <Navbar collapseOnSelect bg="primary" expand="lg" variant="dark">
        <Navbar.Brand href="/">Cinema</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {props.loggedIn && !props.user.is_admin ? (
              <React.Fragment>
                <Nav.Link href="/movies">All Movies</Nav.Link>
              </React.Fragment>
            ) : (
              ""
            )}
            {props.loggedIn && props.user.is_admin ? (
              <React.Fragment>
                <Nav.Link href="/admin/users">Users</Nav.Link>
                <Nav.Link href="/admin/movies">Movies</Nav.Link>
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
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {props.user.first_name} {props.user.last_name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/logout" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
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
