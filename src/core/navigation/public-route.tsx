import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Route as IRoute } from './routes';
import BlankLayout from './BlankLayout';

export const PublicRoute = (route: IRoute) => {
  const Layout = route.layout || BlankLayout;
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props =>
        route.redirectTo ? (
          <Redirect to={route.redirectTo} />
        ) : (
          <Layout {...props}>
            <route.component {...props} {...route} />
          </Layout>
        )
      }
    />
  );
};
