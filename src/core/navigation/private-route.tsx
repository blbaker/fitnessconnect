import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Route as IRoute } from './routes';

export const PrivateRoute = (route: IRoute) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props =>
      route.canActivate ? (
        <route.component {...route} {...props} />
      ) : (
        <Redirect to={route.failurePath || '/'} />
      )
    }
  />
);
