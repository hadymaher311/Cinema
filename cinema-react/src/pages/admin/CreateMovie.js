import React, { Component } from "react";
import Axios from "axios";

export class CreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      length: "",
      image: null,
      errors: {}
    };
  }

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleImage = e => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = event => {
      this.setState({
        image: reader.result
      });
    };
  };

  handleForm = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      genre: this.state.genre,
      length: this.state.length,
      image: this.state.image
    };
    Axios.post("http://localhost:8000/api/admin/movies/store", data)
      .then(res => {
        // dispatch action
        this.props.history.push("/admin/movies");
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  render() {
    return (
      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-md-5 mr-auto ml-auto">
            <h1 className="text-center">Create New Movie</h1>
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  name="name"
                  placeholder="Name"
                  autoFocus
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  name="genre"
                  placeholder="Genre"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <label>Length</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  placeholder="Length"
                  name="length"
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  required
                  placeholder="Image"
                  name="image"
                  onChange={this.handleImage}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleForm}>
                  Add new movie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMovie;
