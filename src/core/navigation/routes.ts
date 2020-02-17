import React from 'react';
import history from 'history';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Class from '../../pages/Classes/Class/Class';
import Classes from '../../pages/Classes/Classes';
import NotFound from '../../pages/NotFound/NotFound';
import { AuthStore } from '../stores/store.types';
import PrivateLayout from '../../components/PrivateLayout/PrivateLayout';
import PublicLayout from '../../components/PublicLayout/PublicLayout';

export interface BaseRoute {
  component: React.FC<any>;
  layout?: string | React.FC<any> | React.ComponentClass<any, any>;
  name?: string;
  exact?: boolean;
  path?: string;
  redirectTo?: string;
}

export interface NotFoundRoute extends BaseRoute {}

export interface Route extends BaseRoute {
  canActivate?: boolean;
  failurePath?: history.LocationDescriptor;
  routes?: (Route | NotFoundRoute)[];
}

export const routesSchema = (authStore: AuthStore): (Route | NotFoundRoute)[] => [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: Login,
    layout: PublicLayout,
  },
  {
    name: 'Classes',
    path: '/classes',
    exact: true,
    component: Classes,
    canActivate: authStore.isLoggedIn,
    failurePath: '/login',
    layout: PrivateLayout,
  },
  {
    name: 'Class',
    path: '/classes/:classId',
    component: Class,
    canActivate: authStore.isLoggedIn,
    failurePath: '/login',
    layout: PrivateLayout,
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true,
    redirectTo: authStore.isLoggedIn ? '/classes' : '/login',
  },
  {
    name: '404',
    component: NotFound,
    layout: PublicLayout,
  },
];
