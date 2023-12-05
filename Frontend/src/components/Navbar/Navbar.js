import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './Navbar.module.css';
// Svg của Icon search
const SearchIcon = () => {
  return (
    <svg
      className="svg-inline--fa fa-search"
      fill="#ccc"
      aria-hidden="true"
      data-prefix="fas"
      data-icon="search"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
    </svg>
  );
};
export {SearchIcon}

const Navbar = () => {
  const sensor = useRef(null);
	const navbar = useRef(null);
  // Sử dung IntersectionObserver để thay đổi background cho navbar mỗi khi sensor intersect với document viewport,  
  useEffect(() => {
    const scrollingEffect = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					navbar.current.style.backgroundColor = `transparent`;
        }
				if (!entry.isIntersecting) {
					navbar.current.style.backgroundColor = `black`;
				}
      });
    };
    const observer = new IntersectionObserver(scrollingEffect);
    observer.observe(sensor.current);
    return () => observer.disconnect();
    
  });
  // Click vào MovieApp để đến Browse page, click vào SearchIcon để đến Search page
  return (
    <>
      <span className={`${classes['sensor']}`} ref={sensor}></span>
      <ul className={`${classes['bg-dark']} nav justify-content-between fixed-top`} ref={navbar}>
        <li className="nav-item">
          <Link className="nav-link text-danger fw-bold" to='/'>
            Movie App
          </Link>
        </li>
        <li className={`nav-item ${classes['w-10']}`}>
          <Link className="nav-link" to="search">
            <SearchIcon />
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Navbar;
