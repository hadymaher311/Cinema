import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { connect } from "react-redux";
import Error from "../../components/Error";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleForm = e => {
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password };
    axios
      .post("http://localhost:8000/api/auth/login", data)
      .then(res => {
        cookie.set("token", res.data.access_token);
        // dispatch action
        this.props.setLogin(res.data.user);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mr-auto ml-auto mt-5">
            <div className="card">
              <div className="card-body">
                <h1>Login Form</h1>
                <form>
                  <Error
                    error={
                      this.state.errors["result"]
                        ? this.state.errors["result"]
                        : null
                    }
                  />
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      autoFocus
                      onChange={this.handleInput}
                    />
                    <Error
                      error={
                        this.state.errors["email"]
                          ? this.state.errors["email"]
                          : null
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={this.handleInput}
                    />
                    <Error
                      error={
                        this.state.errors["password"]
                          ? this.state.errors["password"]
                          : null
                      }
                    />
                  </div>
                  <button className="btn btn-primary" onClick={this.handleForm}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user =>
      dispatch({
        type: "SET_LOGIN",
        payload: user
      })
  };
};
export default connect(null, mapDispatchToProps)(Login);
