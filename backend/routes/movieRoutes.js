const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Add a movie (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, genre, poster, releaseDate, description, seats } = req.body;
    const movie = new Movie({ title, genre, poster, releaseDate, description, seats });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding movie' });
  }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;  // The ID should come from the URL parameter
    try {
      const movie = await Movie.findByIdAndDelete(id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting movie' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find(); // Fetch all movies from the database
      res.status(200).json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching movies' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id); // Using the ID from the URL params
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' }); // Return 404 if the movie is not found
      }
      res.json(movie); // Return the movie details as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
