import { useState, useEffect, useMemo } from 'react';
import useHttp from '../../hooks/useHttp';

import YouTube from 'react-youtube';

import classes from './MovieDetail.module.css';

const MovieDetail = (props) => {
  const {
    id,
    title,
    name,
    release_date: rDate,
    first_air_date: faDate,
    vote_average: vote,
    overview,
    apiKey,
  } = props;
  const opts = useMemo(() => {
    return {
      height: '400',
      width: '100%',
      playerVars: {
        autoplay: 0,
      },
    };
  }, []);
  // State media chứa video miêu tả nêu có, không thì backdrop_path Img của Movie
  const [media, setMedia] = useState(null);
  const { error, sendRequest } = useHttp();
  const url = `http://127.0.0.1:5000/api/v1/${apiKey}/movies/video/`;

  useEffect(() => {
    // Fnc getMedia để xử lý dữ liệu trả về sau khi fetch
    const getMedia = (data) => {
      const result = data.result;
      setMedia(<YouTube videoId={result.key} opts={opts} />);
    };
    // Gọi send request để fetch url và xử lý data bằng getMedia function
    const searchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: id }),
    }
    sendRequest(url, getMedia,  searchOpts);
  }, [opts, sendRequest, url, id]);

  useEffect(() => {
    // Kiểm tra error state trả về từ useHttp, nếu true thì setMedia bằng backdrop img
    if (error) {
      setMedia(
        <div>
          <img
            className="object-fit-cover w-100"
            alt="img"
            src={`${props.imgSrc}${props.backdrop_path}`}
          ></img>
        </div>
      );
    }
  }, [error, props.imgSrc, props.backdrop_path]);
  // Hiển thị các data đã được xử lý, category NetFlixOriginal có các properties khác các phần còn lại các categories nên cần kiểm tra sự tồn tại của các key trước
  return (
    <div className={classes['detail-container']}>
      <div className={classes['info']}>
        <h4 className="fw-bold">{title ?? name}</h4>
        <div className="fw-bold">
          <p>
            {rDate ? `Release Date: ${rDate}` : `First Air Date: ${faDate}`}
          </p>
          <p>{`Vote: ${vote}/10`}</p>
        </div>
        <div className="overview">{overview}</div>
      </div>
      {media}
    </div>
  );
};
export default MovieDetail;
