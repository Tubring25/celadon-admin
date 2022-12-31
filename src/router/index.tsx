import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/router/interface';
import LayoutIndex from '@/layouts/index';
import Home from '@/views/home/index';
import Login from '@/views/login/index';
import Authority from '@/views/authority/index';
import React from 'react';

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        element: <Home />,
        meta: {
          label: '首页',
          key: 'home',
        },
      },
    ],
  },
  {
    element: <LayoutIndex />,
    meta: { label: '权限管理', key: 'auth', icon: 'RedditOutlined' },
    children: [
      {
        path: '/auth/authManage',
        element: <Authority />,
        meta: {
          label: '权限管理sub',
          key: 'authManage',
        },
      },
      {
        path: '/auth/home3',
        element: <Home />,
        meta: {
          label: '首页',
          key: 'home',
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const Router = () => {
  return useRoutes(rootRouter);
};

export default Router;
