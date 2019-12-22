import React, { Component } from "react";
import Axios from "axios";
import { MovieHeader } from "../../components/MovieHeader";

export default class Screening extends Component {
  state = {
    screening: null,
    screeningId: this.props.match.params.id,
    intervalId: null
  };

  componentDidMount() {
    this.loadData();
    const intervalId = setInterval(() => {
      this.loadData();
    }, 60000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  loadData = () => {
    const { screeningId } = this.state;
    Axios.get(
      `http://localhost:8000/api/user/movies/${screeningId}/reservations`
    )
      .then(response => {
        this.setState({ screening: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleReservation = id => {
    if (
      this.state.screening.reservations.findIndex(
        reservation => reservation.seat_id === id
      ) !== -1
    ) {
      return;
    }
    if (window.confirm("Are you sure?")) {
      const { screeningId } = this.state;
      Axios.post(
        `http://localhost:8000/api/user/movies/${id}/reservations/${screeningId}/store`
      )
        .then(response => {
          const newScreening = {
            ...this.state.screening,
            reservations: this.state.screening.reservations.concat(
              response.data.data
            )
          };
          this.setState({ screening: newScreening });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { screening } = this.state;
    console.log(screening);
    if (screening) {
      const {
        movie,
        screen: { seats },
        reservations
      } = screening;
      return (
        <div>
          <MovieHeader movie={movie} />
          <div className="container mt-5">
            <h3>Seats</h3>
            {seats.map(seat => (
              <div
                key={seat.id}
                style={{
                  width: `${100 / this.state.screening.screen.cols}%`,
                  float: "left",
                  padding: "2rem",
                  backgroundColor:
                    reservations.findIndex(
                      reservation => reservation.seat_id === seat.id
                    ) !== -1
                      ? "red"
                      : "green",
                  cursor: "pointer"
                }}
                className="text-center text-white border"
                onClick={() => this.handleReservation(seat.id)}
              >
                {seat.id}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <div className="text-center mt-5">Loading...</div>;
  }
}
