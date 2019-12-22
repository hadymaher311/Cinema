import React, { Component } from "react";
import Axios from "axios";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import {Link} from 'react-router-dom'

export default class Movie extends Component {
  state = {
    movie: null,
    movieId: this.props.match.params.id
  };
  componentDidMount() {
    const { movieId } = this.state;
    Axios.get(`http://localhost:8000/api/user/movies/${movieId}`)
      .then(response => {
        console.log(response.data.data);
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
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <img src={movie.image.image_url} alt={movie.name} />
                </div>
              </div>
              <div className="col-md-9">
                <h1>{movie.name}</h1>
                <h3 className="text-secondary">{movie.genre}</h3>
                <div>Length: {movie.length} hrs</div>

                <h4 className="mt-5">Screening Times</h4>
                <ListGroup variant="flush">
                  {movie.screening.map(screening => (
                    <ListGroup.Item key={screening.id}>
                      {/* <div className="row">
                        <div
                      </div> */}
                      Screen num: #{screening.screen_id}
                      <div>
                        From:{" "}
                        <span className="text-secondary">{moment(screening.from).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                      </div>
                      <div>
                        To:{" "}
                        <span className="text-secondary">{moment(screening.to).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                      </div>
                      <Link className="btn btn-primary" to="/">View</Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="text-center mt-5">Loading ...</div>;
  }
}
