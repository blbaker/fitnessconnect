import React from 'react';
import history from 'history';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Class from '../../pages/Classes/Class/Class';
import Classes from '../../pages/Classes/Classes';
import { AuthStore } from '../stores/store.types';
import PrivateLayout from '../../components/PrivateLayout/PrivateLayout';
import PublicLayout from '../../components/PublicLayout/PublicLayout';

export interface Route {
  canActivate?: boolean;
  component: React.FC<any>;
  exact?: boolean;
  failurePath?: history.LocationDescriptor;
  layout?: string | React.FC<any> | React.ComponentClass<any, any>;
  name?: string;
  path: string;
  redirectTo?: string;
  routes?: Route[];
}

export const routesSchema = (authStore: AuthStore): Route[] => [
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
];
