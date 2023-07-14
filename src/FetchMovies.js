import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchMovies.css';
import tmdbLogo from './assets/tmdb.svg';

function FetchMovies() {
  const API_KEY = 'e2901b0';
  const DEFAULT_SEARCH_QUERY = 'recep'; // Default search query

  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(response.data);

      if (response.data.Response === 'False') {
        setLoading(false);
        setFilms([]);
      } else {
        setLoading(false);
        setFilms(response.data.Search);
      }
    } catch (error) {
      console.log('Error fetching movies', error);
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchMovies(searchQuery);
    }
  };

  useEffect(() => {
    fetchMovies(DEFAULT_SEARCH_QUERY); // Call fetchMovies with the default search query


  }, []);

  const listFilms = () => {
    if (loading) {
      return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;
    }
    if (films != null) {
      if (films.length > 0) {
        return (
          <ul className='posterContainer'>
            {films.map((film, index) => {
              return (
                <li className='films' key={index}>
                  <img className='poster' src={film.Poster} alt={film.Title} />
                  {film.Title}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return <p style={{ color: 'white', textAlign: 'center' }}>No films found</p>;
      }
    }
  };

  return (
    <div className='Container'>
      <div className='row'>
        <div className='col-left'>
          <img className='logo' src={tmdbLogo} alt='TMDB' />
        </div>
        <div className='col-right'>
          <input
            className='search'
            type='text'
            placeholder='Search for a movie'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='button' onClick={() => fetchMovies(searchQuery)}>
            Search
          </button>
        </div>
      </div>
      <div className='row-film'>{listFilms()}</div>
    </div>
  );
}

export default FetchMovies;
