import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

class Welcome extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    Axios.get("http://localhost:8000/api/welcome/movies/")
      .then(response => {
        this.setState({ movies: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.state;
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${require("../assets/images/bg.jpg")})`,
            height: "100vh",
            backgroundSize: "cover"
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(2,2,2,.7)",
              height: "100vh"
            }}
            className="text-white text-center"
          >
            <div className="container">
              <div
                className="row align-items-center"
                style={{
                  height: "100vh"
                }}
              >
                <div className="col-md-4 mr-auto ml-auto">
                  <h1 style={{ fontSize: "100px" }}>Cinema</h1>
                  {!this.props.loggedIn ? (
                    <React.Fragment>
                      <Link to="/login" className="btn btn-primary btn-lg mr-3">
                        Login
                      </Link>
                      <Link to="/register" className="btn btn-success btn-lg">
                        Register
                      </Link>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="text-center">
            <h1>Latest Movies</h1>
            <div className="row mt-3 mb-3">
              {movies.map(movie => (
                <div key={movie.id} className="col-md-3">
                  <div className="card mb-3">
                    <img
                      src={movie.image.image_url}
                      className="card-img-top"
                      alt={movie.name}
                    />
                    <div className="card-body">
                      <p className="card-text">{movie.name}</p>
                      <p className="text-muted card-text">{movie.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};
export default connect(mapStateToProps)(Welcome);
