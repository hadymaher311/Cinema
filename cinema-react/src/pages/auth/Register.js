import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Error from "../../components/Error";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      birth_date: "",
      password: "",
      password_confirmation: "",
      errors: {}
    };
  }

  handleDateChange = date => {
    this.setState({ birth_date: date });
  };

  handleForm = e => {
    e.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      birth_date: this.state.birth_date,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    axios
      .post("http://localhost:8000/api/auth/register", data)
      .then(res => {
        cookie.set("token", res.data.access_token);
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
    const maxDate = moment()
      .subtract(18, "years")
      .toDate();
    const minDate = moment()
      .subtract(100, "years")
      .toDate();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 mr-auto ml-auto mt-5">
            <div className="card">
              <div className="card-body">
                <h1>Register Form</h1>
                <form>
                  <Error
                    error={
                      this.state.errors["result"]
                        ? this.state.errors["result"]
                        : null
                    }
                  />
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                      onChange={this.handleInput}
                      autoFocus
                    />
                    <Error
                      error={
                        this.state.errors["first_name"]
                          ? this.state.errors["first_name"]
                          : null
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                      onChange={this.handleInput}
                    />
                    <Error
                      error={
                        this.state.errors["last_name"]
                          ? this.state.errors["last_name"]
                          : null
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="form-control"
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
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
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
                    <label>Birth date</label>
                    <br />
                    <DatePicker
                      style={{ width: "100%" }}
                      selected={this.state.birth_date}
                      placeholderText="Click to select a date"
                      className="form-control"
                      onChange={this.handleDateChange}
                      minTime={minDate}
                      maxTime={maxDate}
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
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      className="form-control"
                      onChange={this.handleInput}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={this.handleForm}>
                    Register
                  </button>
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
export default connect(null, mapDispatchToProps)(Register);
