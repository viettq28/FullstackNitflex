import RequestCtx from './request-ctx';
// Component có tác dụng provide context cho các children, nó cung cấp các tùy chọn fetch, IMG_BASE_URL và API_KEY để người dùng lấy các nội dung khác
const ContextProvider = ({ children }) => {
  const API_KEY = 'd2a068d7a5a0609d0c082e67b28bdbdc';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

  const fetchType = {
    fetchTrending: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/trending`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/top-rate`,
    fetchActionMovies: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/discover/28`,
    fetchComedyMovies: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/discover/35`,
    fetchHorrorMovies: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/discover/27`,
    fetchRomanceMovies: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/discover/10749`,
    fetchDocumentaries: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/discover/99`,
    fetchSearch: `http://127.0.0.1:5000/api/v1/${API_KEY}/movies/search`,
  };
 
  return (
    <RequestCtx.Provider value={[fetchType, IMG_BASE_URL, API_KEY]}>{children}</RequestCtx.Provider>
  );
};

export default ContextProvider;
