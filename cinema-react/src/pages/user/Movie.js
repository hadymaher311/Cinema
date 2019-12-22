import React, { Component } from "react";
import Axios from "axios";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { MovieHeader } from "../../components/MovieHeader";

export default class Movie extends Component {
  state = {
    movie: null,
    movieId: this.props.match.params.id
  };
  componentDidMount() {
    const { movieId } = this.state;
    Axios.get(`http://localhost:8000/api/user/movies/${movieId}`)
      .then(response => {
        this.setState({ movie: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { movie } = this.state;
    if (movie) {
      return (
        <div>
          <MovieHeader movie={movie}>
            <h4 className="mt-5">Screening Times</h4>
            <ListGroup variant="flush">
              {movie.screening.map(screening => (
                <ListGroup.Item key={screening.id}>
                  Screen num: #{screening.screen_id}
                  <div>
                    From:{" "}
                    <span className="text-secondary">
                      {moment(screening.from).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <div>
                    To:{" "}
                    <span className="text-secondary">
                      {moment(screening.to).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <Link
                    className="btn btn-primary"
                    to={`/screening/${screening.id}`}
                  >
                    View
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </MovieHeader>
        </div>
      );
    }
    return <div className="text-center mt-5">Loading ...</div>;
  }
}
