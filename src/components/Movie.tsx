import React from 'react';
import { MovieData } from './Types';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

type Props ={
    movie: MovieData;
}
const Movie =({ movie }: Props) => {
    const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return(
        <div className="movie">
            <div>
                <img
                  width='200'
                  alt={`The movie titled: ${movie.Title}`}
                  src={poster}
                />
            </div>
            <h3>{movie.Title}</h3>
        </div>
      )
}

export default Movie;