import React from 'react';
import history from 'history';

export interface BaseRoute {}

export interface Route extends BaseRoute {
  component?: React.FC<any>;
  exact?: boolean;
  layout?: string | React.FC<any> | React.ComponentClass<any, any>;
  name: string;
  path?: string;
  redirectTo?: string | any;
  canActivate?: boolean;
  failurePath?: history.LocationDescriptor;
  routes?: Route[];
  data?: { [key: string]: any };
}
