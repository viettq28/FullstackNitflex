import { useState, Fragment } from 'react';

import Banner from '../../components/Banner/Banner';
import MovieList from '../../components/MovieList/MovieList';
import MovieDetail from '../../components/MovieList/MovieDetail';

function Browse() {
  // Danh sách các categories để hiển thị list movies
  const categories = {
    NetflixOriginals: '',
    Trending: 'Xu hướng',
    TopRated: 'Xếp hạng cao',
    ActionMovies: 'Hành động',
    ComedyMovies: 'Hài',
    HorrorMovies: 'Kinh dị',
    RomanceMovies: 'Lãng mạng',
    Documentaries: 'Tài Liệu',
  };
  // selectedMovie để mở đóng và cung cấp dữ liệu cho MovieDetail
  // setSelectedMovies được truyền vào MovieList để xử lý click event của người dùng
  const [selectedMovie, setSelectedMovie] = useState({
    detail: {},
    listId: null,
    target: null,
  });

  // Click event, người dùng click vào cùng đối tượng Movie thì đóng MovieDetail, xóa .__active
  // Người dùng click vào Movie khác thì hiển thị MovieDetail mới, xóa .__active ở Movie cũ và thêm .__active ở Movie mới, nếu thuộc MovieList khác thì đóng MovieDetail ở vị trí MovieList cũ
  const handleClick = (movie, listId, e) => {
    if (e.target === selectedMovie.target) {
      selectedMovie.target.classList.remove('__active');
      setSelectedMovie({
        detail: {},
        listId: null,
        target: null,
      });
    } else {
      selectedMovie?.target?.classList.remove('__active');
      e.target.classList.add('__active');
      setSelectedMovie({
        detail: movie,
        listId: listId,
        target: e.target,
      });
    }
  };

  return (
    <div className="app">
      <Banner />
      <div className="container-xxl">
        {/* Map các MovieList */}
        {Object.entries(categories).map((entry, i) => (
          <Fragment key={i}>
            <MovieList
              id={i}
              selectedCategory={entry}
              handleClick={handleClick}
            />
            {/* Kiểm tra selectedMovie.listId và selectedMovie.detail để hiển thị MovieDetail ở vị trí tương ứng nếu có */}
            {selectedMovie.listId === i && selectedMovie.detail && (
              <MovieDetail
                key={selectedMovie.detail.id}
                {...selectedMovie.detail}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Browse;
