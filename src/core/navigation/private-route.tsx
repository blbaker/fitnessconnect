import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import BlankLayout from './BlankLayout';
import { Route as IRoute } from './models';

export const PrivateRoute = (route: IRoute) => {
  const Layout = route.layout || BlankLayout;
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props =>
        route.redirectTo ? (
          <Redirect to={route.redirectTo} />
        ) : route.hasOwnProperty('canActivate') && route.canActivate ? (
          <Layout {...props}>
            <route.component {...props} {...route} />
          </Layout>
        ) : (
          <Redirect to={route.failurePath || '/'} />
        )
      }
    />
  );
};
