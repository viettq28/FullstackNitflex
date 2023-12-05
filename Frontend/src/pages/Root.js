import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
// Root xuất ra NavBar cố định cùng với Phần Outlet render tùy theo path Url
const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
