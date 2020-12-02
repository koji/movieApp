import React, { useEffect, useReducer } from 'react';
import { MovieDetailData } from '../components/Types';

type Props = {
    id: string;
}

const initialState = {
  loading: true,
  movieDetail: {},
  errorMessage: null
};

const reducer = (state: any, action: any) => {
    switch(action.type) {
      case "GET_MOVIE_DETAIL_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null,
        };

      case "GET_MOVIE_DETAIL_SUCCESS":
        return {
          ...state,
          loading: false,
          movieDetail: action.payload
        };

      case "GET_MOVIE_DETAIL_FAILURE":
        return {
          ...state,
          loding: false,
          errorMMessage: action.error,
        }

      default:
        return state;
    }
  }

// movie detail: http://www.omdbapi.com/?apikey=4a3b711b&i=tt0371746

const MovieDetail = (props: Props) => {
    const apiKey = "4a3b711b";
    const MOVIE_API_DETAIL_URL = `http://www.omdbapi.com/?apikey=${apiKey}&i=${props.id}`;

    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const resp = await fetch(MOVIE_API_DETAIL_URL);
            const json = (await resp.json()) as MovieDetailData;
            if(json.Response === 'True') {
              dispatch({
                type: "GET_MOVIE_DETAIL_SUCCESS",
                payload: json,
              });
            } else {
              dispatch({
                type: "GET_MOVIE_DETAIL_FAILURE",
                error: json.Error
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);


    const  { movieDetail, errorMessage, loading } = state;
    return(
        <div>
            movie title: {movieDetail.Title}
            poster
            year
            rated
            runtime
            Genre
            Director
            Writer
            Actors
            Plot
            awards
            ratings
            production
            website
        </div>
    )
}

export default MovieDetail;
/**
 * sample data
{
Title: "Iron Man",
Year: "2008",
Rated: "PG-13",
Released: "02 May 2008",
Runtime: "126 min",
Genre: "Action, Adventure, Sci-Fi",
Director: "Jon Favreau",
Writer: "Mark Fergus (screenplay), Hawk Ostby (screenplay), Art Marcum (screenplay), Matt Holloway (screenplay), Stan Lee (characters), Don Heck (characters), Larry Lieber (characters), Jack Kirby (characters)",
Actors: "Robert Downey Jr., Terrence Howard, Jeff Bridges, Gwyneth Paltrow",
Plot: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
Language: "Hungarian, Kurdish, Hindi, English, Persian, Urdu, Arabic",
Country: "USA, Canada",
Awards: "Nominated for 2 Oscars. Another 21 wins & 65 nominations.",
Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
Ratings: [
{
Source: "Internet Movie Database",
Value: "7.9/10"
},
{
Source: "Rotten Tomatoes",
Value: "94%"
},
{
Source: "Metacritic",
Value: "79/100"
}
],
Metascore: "79",
imdbRating: "7.9",
imdbVotes: "917,253",
imdbID: "tt0371746",
Type: "movie",
DVD: "30 Sep 2008",
BoxOffice: "$318,298,180",
Production: "Paramount Pictures",
Website: "N/A",
Response: "True"
}
 */
