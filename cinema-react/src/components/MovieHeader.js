import React from "react";

export const MovieHeader = props => {
  const movie = props.movie;
  
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
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
