import classes from './Movie.module.css'

const Movie = ({ imgSrc, movie, display = 'backdrop', handleClick }) => {
  // Component hiển thị hình ảnh miêu tả phim cùng với clickHandler
  return (
    <div className="position-relative">
      <img
        src={`${imgSrc}${movie[`${display}_path`]}`}
        alt='movie'
        className={`${classes['img']} w-100 h-100 object-fit-cover`}
        onClick={handleClick}
      ></img>
    </div>
  );
};

export default Movie;
