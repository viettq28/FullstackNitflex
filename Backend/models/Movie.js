const fs = require("fs");
const path = require("path");

const moviesPath = path.join(__dirname, '..', 'models', 'datas', 'movieList.json');
const genresPath = path.join(__dirname, '..', 'models', 'datas', 'genreList.json');
const videosPath = path.join(__dirname, '..', 'models', 'datas', 'videoList.json');
const movies = JSON.parse(fs.readFileSync(moviesPath).toString());
const genres = JSON.parse(fs.readFileSync(genresPath).toString());
const moviesVideo = JSON.parse(fs.readFileSync(videosPath).toString());

class Movie {
  static getGenreName(id) {
    return genres.find(genre => genre.id === +id).name;
  };
  // Fetch all movies (and sort)
  static fetchAll(sortOption) {
    if(sortOption === 'trending') {
      return movies.sort((a ,b) => b.popularity - a.popularity);
    };
    if(sortOption === 'top-rate') {
      return movies.sort((a ,b) => b.vote_average - a.vote_average);
    };
    return movies;
  };
  // Fetch some movies by search results
  static fetchMoviesBySearch(keyword, opts) {
    const searchResult = movies.filter(movie => {
      const title = movie.title ? movie.title.toLowerCase() : movie.name.toLowerCase();
      const overview = (movie.overview).toLowerCase();
      const isMatchKeyword = title.includes(keyword) || overview.includes(keyword);
      if(!opts) return isMatchKeyword;

      const {genre, mediaType, language, year} = opts;
      const release = movie.release_date ? new Date(movie.release_date) : new Date(movie.first_air_date);
      const isMatchGenre = !(genre+"").length ? true : movie.genre_ids.includes(+genre);
      const isMatchMedia = !mediaType.length ? true : movie.media_type === mediaType;
      const isMatchLang = !language.length ? true : movie.original_language === language;
      const isMatchYear = !(year+"").length ? true : release.getFullYear() === +year;
      return isMatchKeyword && isMatchGenre && isMatchMedia && isMatchLang && isMatchYear;
    })
    return searchResult;
  };
  // Fetch some movies by input genre
  static fetchByGenre(genreId) {
    const isGenre = genres.some(genre => genre.id === +genreId);
    if (!isGenre) return null;
    return movies.filter(movie => {
      return movie.genre_ids.includes(+genreId);
    })
  };
  // Fetch some videos by movie id
  static fetchVideo(filmId) {
    const vidList = moviesVideo.find(video => video.id === filmId)?.videos;
    if (!vidList) return 'Id not found';
    const [result,] = vidList.reduce(([recentVid, recentPublishTime], vid) => {
      const isFitVideo = (
        vid.official === true &&
        vid.site === 'YouTube' &&
        (vid.type === 'Trailer' || vid.type === 'Teaser')
      );
      if (!isFitVideo) return [null, 0];
      let publishedAt = +Date.parse(vid.published_at);
      if (publishedAt > recentPublishTime) return [vid, publishedAt];
      else return [recentVid, recentPublishTime];
    }, [null, 0]);
    return result; 
  }
}

module.exports = Movie;