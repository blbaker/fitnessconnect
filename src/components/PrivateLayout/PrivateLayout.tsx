import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './PrivateLayout.scss';
import { useMst } from '../../stores/RootStore';
import { color } from '../../theme';
import { filter } from 'underscore';
import { isActiveRoute, routesSchema } from '../../core/navigation';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: palette.grey[100],
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: spacing(2),
  },
  appBar: {
    backgroundColor: color.darkerBlue,
    color: palette.common.white,
  },
  leftComponentContainer: {
    flexGrow: 1,
  },
  leftComponent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 61,
  },
  headerBar: {
    backgroundColor: color.darkerBlue,
  },
  drawerPaper: {
    backgroundColor: color.darkestBlue,
  },
  subRoutes: {
    height: '100%',
  },
  subRoute: {
    height: '100%',
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    borderRadius: 0,
    '&.active': {
      borderBottom: `3px solid ${color.cyan}`,
    },
  },
  hide: {
    display: 'none',
  },
}));

export const PrivateLayout: React.FC = observer((props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { authStore } = useMst();
  const handleLogout = () => {
    authStore.logout();
  };
  const stripePromise = loadStripe('pk_test_iw8Ad3MDTwIIvskXtW8ravvH');

  const subRoutes = ['/account', '/dashboard', '/upgrade'];

  const privateSubRoutes = filter(routesSchema(authStore), (route) =>
    subRoutes.includes(route.path),
  );

  const [state, setState] = React.useState({
    drawerOpen: false,
    service: null,
  });

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, drawerOpen: !state.drawerOpen });
  };

  const renderTab = (subRoute) => (
    <Button
      key={subRoute.name}
      color="inherit"
      className={clsx(classes.menuButton, classes.subRoute, {
        active: isActiveRoute(subRoute.path),
      })}
      startIcon={subRoute.data.icon}
      component={Link}
      to={subRoute.path}
    >
      {subRoute.name}
    </Button>
  );

  const leftComponent = (
    <div className={classes.leftComponent}>
      <div className={classes.subRoutes}>
        {privateSubRoutes.map((subRoute) => renderTab(subRoute))}
      </div>
    </div>
  );

  return (
    <>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6">FitnessConnect</Typography>
          <div className={classes.leftComponentContainer}>{leftComponent}</div>
          {authStore.isLoggedIn && (
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
          {!authStore.isLoggedIn && (
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Elements stripe={stripePromise}>
        <div className={classes.root}>{props.children}</div>
      </Elements>
    </>
  );
});

export default PrivateLayout;
