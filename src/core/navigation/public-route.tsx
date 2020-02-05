import React from 'react';
import { Route } from 'react-router-dom';

import { Route as IRoute } from './routes';

export const PublicRoute = (route: IRoute) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} {...route} />}
  />
);
