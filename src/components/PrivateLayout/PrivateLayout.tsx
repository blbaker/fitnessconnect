import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import './PrivateLayout.scss';
import { useMst } from '../../stores/RootStore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {},
}));

export const PrivateLayout: React.FC = observer((props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { authStore } = useMst();
  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            @Cycle2
          </Typography>
          {authStore.isLoggedIn && (
            <Button variant="contained" className={classes.button} onClick={handleLogout}>
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
      {props.children}
    </>
  );
});

export default PrivateLayout;
