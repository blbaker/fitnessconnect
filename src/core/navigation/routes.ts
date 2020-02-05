import React from 'react';
import history from 'history';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Class from '../../pages/Classes/Class/Class';
import Classes from '../../pages/Classes/Classes';
import { AuthStore } from '../stores/store.types';

export interface Route {
  name?: string;
  routes?: Route[];
  path: string;
  component: React.FC<any>;
  canActivate?: Function;
  failurePath?: history.LocationDescriptor;
  exact?: boolean;
}

export const routes: Route[] = [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    name: 'Classes',
    path: '/classes',
    exact: true,
    component: Classes,
    canActivate: (authStore: AuthStore) => authStore.isLoggedIn,
    failurePath: '/login',
  },
  {
    name: 'Class',
    path: '/classes/:classId',
    component: Class,
    canActivate: (authStore: AuthStore) => authStore.isLoggedIn,
    failurePath: '/login',
  },
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
];
