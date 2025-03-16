import React, { useState, useEffect } from 'react';
import api from '../api';
import './Admin.css';

const Admin = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieReleaseDate, setMovieReleaseDate] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get('/movies');
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  const handleMovieCreation = async () => {
    if (!movieTitle || !movieGenre || !movieReleaseDate || !movieDescription || !moviePoster) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.post('/movies', {
        title: movieTitle,
        genre: movieGenre,
        releaseDate: movieReleaseDate,
        description: movieDescription,
        poster: moviePoster,
      });
      alert('Movie added successfully!');
      setMovieTitle('');
      setMovieGenre('');
      setMovieReleaseDate('');
      setMovieDescription('');
      setMoviePoster('');
      // Fetch updated list
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (err) {
      console.error('Error creating movie', err);
      alert('Failed to add movie.');
    }
  };

  const handleMovieDeletion = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      alert('Movie deleted successfully!');
      // Fetch updated movie list after deletion
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (err) {
      console.error('Error deleting movie', err);
      alert('Failed to delete movie.');
    }
  };

  return (
    <div className="admin">
      <h2 className="admin-title">Admin Panel</h2>
      <div className="movie-form">
        <div className="form-row">
          <label htmlFor="movieTitle">Movie Title</label>
          <input
            id="movieTitle"
            type="text"
            placeholder="Enter movie title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="movieGenre">Genre</label>
          <input
            id="movieGenre"
            type="text"
            placeholder="e.g., Action"
            value={movieGenre}
            onChange={(e) => setMovieGenre(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="movieReleaseDate">Release Date</label>
          <input
            id="movieReleaseDate"
            type="date"
            value={movieReleaseDate}
            onChange={(e) => setMovieReleaseDate(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="movieDescription">Description</label>
          <textarea
            id="movieDescription"
            placeholder="Enter movie description"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="moviePoster">Poster URL</label>
          <input
            id="moviePoster"
            type="text"
            placeholder="Enter poster URL"
            value={moviePoster}
            onChange={(e) => setMoviePoster(e.target.value)}
          />
        </div>
        <button className="add-movie-btn" onClick={handleMovieCreation}>
          Add Movie
        </button>
      </div>

      <div className="movie-list">
        <h3>Existing Movies</h3>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-item">
              <div className="movie-info">
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <span className="movie-title">{movie.title}</span> -{' '}
                  <span className="movie-genre">{movie.genre}</span>
                  <p className="movie-description">{movie.description}</p>
                  <span className="movie-release-date">
                    Released on: {new Date(movie.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="movie-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleMovieDeletion(movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

