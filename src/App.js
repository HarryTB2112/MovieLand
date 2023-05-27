import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// OMDb API key: 8251529d
// Importing API from OMDb
const API_URL = "http://www.omdbapi.com?apikey=8251529d";

// Creating App component
const App = () => {
  // creating state for movies array and for search bar
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Search for specific movies and assign to movies array
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  // Initial search value on page load
  useEffect(() => {
    searchMovies("");
  }, []);

  // Displaying components
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Use the searchbar to search for movies!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
