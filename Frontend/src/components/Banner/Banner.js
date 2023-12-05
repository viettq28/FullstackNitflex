import { useState, useContext, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import RequestCtx from '../../context/request-ctx';

import Card from '../UI/Card';
import Button from '../UI/Button';

import classes from './Banner.module.css';

const Banner = () => {
  const [banner, setBanner] = useState(null);
  // setBanner ngẫu nhiên trong 20 kết quả, lấy các data name, backdrop_path, overview cho Banner
  const [{ fetchNetflixOriginals: url }, imgSrc] = useContext(RequestCtx);
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest(url, (data) => {
      setBanner(
        data.results[Math.round(Math.random() * (data.results.length - 1))]
      );
    });
  }, [sendRequest, url]);

  return (
    <>
      <Card className={`rounded-0 border-0 ${classes['banner-container']}`}>
          {banner && (
            <>
              <img
                src={`${imgSrc}${banner.backdrop_path || banner.poster_path}`}
                alt='banner'
                className="w-100 h-100 object-fit-cover card-img rounded-0 border-0"
              ></img>
              <div className={classes['top-layer']}></div>
              <div className={`${classes['banner-content']}`}>
                <h1 className="text-white fw-bold">{banner.name}</h1>
                <div className={`overview ${classes['banner-desc']}`}>
                  <div className='d-flex mb-2'>
                    <Button className={classes['custom-btn']}>Play</Button>
                    <Button className={classes['custom-btn']}>My List</Button>
                  </div>

                  <div className={classes['line-clamp']}>{banner.overview}</div>
                </div>
              </div>
            </>
          )}
      </Card>
    </>
  );
};
export default Banner;
