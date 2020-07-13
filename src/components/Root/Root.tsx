import React from 'react';
import { Switch } from 'react-router-dom';

import { routesSchema, PublicRoute, PrivateRoute } from '../../core/navigation';
import { observer } from 'mobx-react';
import { useMst } from '../../stores';

export const Root: React.FC = observer(() => {
  const { authStore } = useMst();
  const routes = routesSchema(authStore);
  return (
    <Switch>
      {routes.map((route) => {
        return !route.hasOwnProperty('canActivate') ? (
          <PublicRoute key={route.name} {...route} />
        ) : (
          <PrivateRoute key={route.name} {...route} />
        );
      })}
    </Switch>
  );
});

export default Root;
