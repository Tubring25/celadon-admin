import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { rootRouter } from '@/router/routes';
// import { useDispatch } from 'react-redux';
// import store from '@/store';
import { getCookie } from '@/utils/cookies';
import { useEffect } from 'react';

// const whiteList = ['/login'];

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const dispathc = useDispatch();
  const { pathname } = location;
  console.log(pathname);

  const routeGuard = () => {
    const token = getCookie('token');
    if (!token && pathname !== '/login') {
      navigate('/login');
    }
  };
  useEffect(() => {
    routeGuard();
  });

  return useRoutes(rootRouter);
};

export default Router;
