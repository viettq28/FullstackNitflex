import { useState } from 'react';

import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import MovieDetail from '../../components/MovieList/MovieDetail';

const Search = () => {
  // State searchTerm nhận giá trị từ submit SearchForm, sau đó truyền vào MovieList
  // State selectedMovie thông báo mở đóng và cung cấp thông tin cho MovieDetail
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState({
    detail: {},
    target: null,
  });
  // Click event, người dùng click vào cùng đối tượng Movie thì đóng MovieDetail, xóa .__active
  // Người dùng click vào Movie khác thì hiển thị MovieDetail mới, xóa .__active ở Movie cũ và thêm .__active ở Movie mới
  const resetSelectedMovie = () => {
    setSelectedMovie({
      detail: {},
      target: null,
    });
  };

  const setNewSelectedMovie = (movie, target) => {
    setSelectedMovie({
      detail: movie,
      target: target,
    });
  }
  const handleClick = (movie, _, e) => {
    if (e.target === selectedMovie.target) {
      selectedMovie.target.classList.remove('__active');
      resetSelectedMovie();
    } else {
      selectedMovie.target?.classList.remove('__active');
      e.target.classList.add('__active');
      setNewSelectedMovie(movie, e.target);
    }
  };
  const submitSearchTerm = (term) => {
    resetSelectedMovie();
    setSearchTerm(term);
  };
  // SearchForm để setSearchTerm
  // MovieList hiển thị Movie dựa trên Search Term
  // MovieDetail được hiển thị khi selectedMovie.target != null
  return (
    <div className="app py-5">
      <SearchForm submitSearchTerm={submitSearchTerm} />
      <div className="container-xxl row m-0">
        <div className={selectedMovie.target && 'col-7'}>
          <MovieList
            selectedCategory={['Search']}
            searchTerm={searchTerm}
            handleClick={handleClick}
          />
        </div>
        {selectedMovie.target && (
          <div className="col">
            <MovieDetail
              key={selectedMovie.detail.id}
              {...selectedMovie.detail}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
