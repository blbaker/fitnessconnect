import React from 'react';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Legal from '../../pages/Legal/Legal';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Upgrade from '../../pages/Upgrade/Upgrade';
import NotFound from '../../pages/NotFound/NotFound';
import Account from '../../pages/Account/Account';
import { AuthStore } from '../../stores/store.types';
import PrivateLayout from '../../components/PrivateLayout/PrivateLayout';
import PublicLayout from '../../components/PublicLayout/PublicLayout';
import { Route } from './models';
import Storage from '@material-ui/icons/Storage';
import MultilineChart from '@material-ui/icons/MultilineChart';
import Star from '@material-ui/icons/Star';

export const isActiveRoute = (routePathname: string) => {
  return window.location.pathname === routePathname;
};

export const routesSchema = (authStore: AuthStore): Route[] => [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: Login,
    layout: PublicLayout,
    redirectTo: authStore.isLoggedIn ? '/dashboard' : null,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    layout: PrivateLayout,
    data: {
      icon: <MultilineChart />,
    },
    redirectTo: !authStore.isLoggedIn ? '/login' : null,
  },
  {
    name: 'Account',
    path: '/account',
    exact: true,
    component: Account,
    layout: PrivateLayout,
    data: {
      icon: <Storage />,
    },
    redirectTo: !authStore.isLoggedIn ? '/login' : null,
  },
  {
    name: 'Upgrade',
    path: '/upgrade',
    exact: true,
    component: Upgrade,
    layout: PrivateLayout,
    data: {
      icon: <Star />,
    },
    redirectTo: !authStore.isLoggedIn ? '/login' : null,
  },
  {
    name: 'Legal',
    path: '/legal',
    exact: true,
    component: Legal,
    layout: PublicLayout,
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true,
    redirectTo: authStore.isLoggedIn ? '/dashboard' : null,
    layout: PublicLayout,
  },
  {
    name: '404',
    component: NotFound,
    layout: PublicLayout,
  },
];
