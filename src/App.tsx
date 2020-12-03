import React, { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';

import { MovieData } from './components/Types';
import MovieDetail from './components/MovieDetail';

// const apiKey = "418c7d2d";
const apiKey = "4a3b711b";
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${apiKey}`;

const initialState ={
  loading: true,
  movies: [],
  errorMessage: null
};

// ToDo state and action type
const reducer = (state: any, action: any) => {
  switch(action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };

    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };

    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loding: false,
        errorMMessage: action.error,
      }

    default:
      return state;
  }
}

const App = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [movies, setMovies] = useState<any>([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(MOVIE_API_URL);
        const json = await resp.json();
        // console.log(json.Search);
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: json.Search,
        });
        // setMovies(json.Search)
      } catch (error) {
        console.log(error);
        // setErrorMessage(error);
      }
    }
    fetchData();
  }, []);

  const search = (searchValue: string) => {
    // setLoading(true);
    // setErrorMessage(null);
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    getData(searchValue);
  }

  const getData = async(searchValue: string) =>{
    try {
      const resp = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`);
      const json = await resp.json()
      if(json.Response === 'True') {
        // setMovies(json.Search);
        // setLoading(false);
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: json.Search
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: json.Error
        });
      }
    } catch (error) {
      console.log('error', error);
      // setErrorMessage(json.Error);
      // setLoading(false);
    }
  };

  const { movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text="Movie Search" />
      <Search search={search} />
      {/* <p className="App-Intro">Sharing a few of our favourite movies</p> */}
      <div className="movies">
        {loading && !errorMessage ?(
          <span>loading...</span>
          ): errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie: MovieData, index: number) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
            )}
      </div>
      <MovieDetail id={'tt0371746'} />

    </div>
  );
}

export default App;
