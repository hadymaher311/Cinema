import React, { Component } from "react";
import Axios from "axios";
import Paginate from "../../components/Paginate";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class Movies extends Component {
  state = {
    movies: [],
    meta: {}
  };

  componentDidMount() {
    this.getMovies(1);
  }

  getMovies = page => {
    Axios.get(`http://localhost:8000/api/user/movies?page=${page}`)
      .then(response => {
        console.log(response.data);

        this.setState({ movies: response.data.data, meta: response.data.meta });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlePageChange = page => {
    console.log(page);
    this.getMovies(page);
  };

  render() {
    const { movies, meta } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row mt-5 mb-5">
            {movies.map(movie => (
              <div key={movie.id} className="col-md-3">
                <Link
                  to={`/movies/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card mb-3">
                    <img
                      src={movie.image.image_url}
                      className="card-img-top"
                      alt={movie.name}
                    />
                    <div className="card-body">
                      <p className="card-text text-dark">{movie.name}</p>
                      <p className="text-muted card-text">{movie.genre}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="m-auto text-center">
            <Paginate meta={meta} onPageChange={this.handlePageChange} />
          </div>
        </div>
      </div>
    );
  }
}
