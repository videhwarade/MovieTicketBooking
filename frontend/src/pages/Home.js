import React, { useState, useEffect } from 'react';
import api from '../api';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  // Fetch movies on load
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get('/movies');
        setMovies(res.data);
      } catch (err) {
        setError('Failed to load movies');
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      <h2>Available Movies</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster"/>
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <button onClick={() => window.location.href = `/book/${movie._id}`}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
