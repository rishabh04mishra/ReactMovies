import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError] = useState(null);

  function fetchMoviesHandler() {

    setIsLoading(true);
    setError(null);
    fetch("https://reacthooks-28827-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json")
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMovies(data.results);
        setIsLoading(false);
      }).catch(
        setError('Something went Wrong')
      );
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 &&<MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found....</p>}
        {!isLoading && error &&<p>{error}</p>}
        {isLoading && <p>Loading.......</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
