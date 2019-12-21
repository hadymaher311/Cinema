import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      errors: {}
    };
  }
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleForm = e => {
    e.preventDefault();
    const data = { email: this.state.email, name: this.state.name };
    axios
      .patch("http://localhost:8000/api/auth/update", data)
      .then(res => {
          console.log(res.data);
          
        // dispatch action
        // this.props.updateUser(res.data.user);
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    return (
      <div className="flex w-full">
        <aside className="w-1/6 bg-black h-screen">
          <ul className="text-white p-4">
            <Link to="/profile">
              <li className="bg-gray-900 rounded py-1 px-3">Profile</li>
            </Link>
          </ul>
        </aside>

        <section className="w-5/6 m-2 bg-white flex justify-center">
          <form
            className="border border-gray-500 w-1/2 my-5 rounded"
            onSubmit={this.handleForm}
          >
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">
                Edit your details
              </h1>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleInput}
                  value={this.state.name}
                  placeholder="Name"
                  className="p-2 mt-1 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                  placeholder="Email"
                  className="p-2 mt-1 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                <input
                  type="submit"
                  value="Update"
                  className="p-2 mt-1 vorder border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                />
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email
  };
};
export default connect(mapStateToProps)(Profile);
