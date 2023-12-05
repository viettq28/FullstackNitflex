const path = require('path');
const paging = require(path.join(__dirname, '..', 'utils', 'paging.js'));
const Movie = require(path.join(__dirname, '..', 'models', 'Movie'));

// Route /top-rate && route /trending
exports.getMoviesByType = (req, res) => {
  const page = req.query.page || 1;
  const type = req.params.sort;
  const [totalPages, results] = paging(Movie.fetchAll(type), page);
  res.status(200).json({
    page,
    total_pages: totalPages,
    results,
  });
};
// Route /discover/:genre
exports.getMoviesByGenre = (req, res) => {
  const genreId = req.params.genre;
  const page = req.params.page || 1;
  if (req.params.genre === undefined) {
    res.status(400).json({ message: 'Not found genre param' });
    return;
  }
  const foundMovies = Movie.fetchByGenre(genreId);
  if (!foundMovies) {
    res.status(400).json({ message: 'Not found that genre id' });
    return;
  }
  const genreName = Movie.getGenreName(genreId);
  const [totalPages, results] = paging(foundMovies, page);
  res.status(200).json({
    page,
    total_page: totalPages,
    genre_name: genreName,
    results,
  });
};
// Route /videos
exports.getVideoByMovieId = (req, res) => {
  const id = req.body.movieId;
  const foundVideo = Movie.fetchVideo(id);
  if (foundVideo === 'Id not found') {
    res.status(400).json({
      message: foundVideo,
    });
    return;
  }
  if (!foundVideo) {
    res.status(404).json({
      message: 'Not found video',
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    result: foundVideo
  });
};
// Route /search
exports.getMoviesBySearch = (req, res) => {
  const {keyword, opts} = req.body;
  const results = Movie.fetchMoviesBySearch(keyword, opts);
  if (!results.length) {
    res.status(400).json({
      message: 'Not found any movies',
    });
    return;
  }
  res.status(200).json({
    total_results: results.length,
    results: results.slice(0, 20)
  })
};