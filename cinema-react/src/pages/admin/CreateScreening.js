import React, { Component } from "react";
import moment from "moment";
import Error from "../../components/Error";
import Axios from "axios";
import Swal from "sweetalert2";

export default class CreateScreening extends Component {
  state = {
    screenId: null,
    from: "",
    to: "",
    errors: {},
    screens: [],
    movieId: this.props.match.params.id
  };

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    Axios.get("http://localhost:8000/api/admin/screens")
      .then(response => {
        this.setState({ screens: response.data.data });
      })
      .catch(error => {
        Swal.fire("Oops...", "Something went wrong!", "error");
      });
  }

  handleForm = e => {
    e.preventDefault();
    const data = {
      from: this.state.from,
      to: this.state.to,
      screen_id: this.state.screenId
    };
    const { movieId } = this.state;
    Axios.post(
      `http://localhost:8000/api/admin/movies/store/${movieId}/screening`,
      data
    )
      .then(res => {
        // dispatch action
        this.props.history.push(`/admin/movies/screening/${movieId}`);
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  render() {
    const { screens } = this.state;
    if (screens) {
      return (
        <div className="container mt-3 mb-5">
          <div className="row">
            <div className="col-md-5 mr-auto ml-auto">
              <h1 className="text-center">Create New Screening</h1>
              <form>
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="datetime-local"
                    style={{ width: "100%" }}
                    className="form-control"
                    name="from"
                    onChange={this.handleInput}
                  />
                  <Error
                    error={
                      this.state.errors["from"]
                        ? this.state.errors["from"]
                        : null
                    }
                  />
                </div>
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="datetime-local"
                    style={{ width: "100%" }}
                    className="form-control"
                    name="to"
                    onChange={this.handleInput}
                  />
                  <Error
                    error={
                      this.state.errors["to"] ? this.state.errors["to"] : null
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Screens</label>
                  <select
                    className="form-control"
                    type="text"
                    required
                    placeholder="Screens"
                    name="screenId"
                    onChange={this.handleInput}
                  >
                    <option key="0">Choose Screen</option>
                    {screens.map(screen => (
                      <option key={screen.id} value={screen.id}>
                        #{screen.id}
                      </option>
                    ))}
                  </select>
                  <Error
                    error={
                      this.state.errors["screen_id"]
                        ? this.state.errors["screen_id"]
                        : null
                    }
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" onClick={this.handleForm}>
                    Add new Screening
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <div className="container mt-5 text-center">Loading...</div>;
  }
}
