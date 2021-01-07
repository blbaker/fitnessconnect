import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useMst } from '../../stores';
import { addCommasToNumber } from '../../libs/helpers';
import Alert from '@material-ui/lab/Alert';
import { Button, Paper } from '@material-ui/core';
import { differenceInMinutes, endOfDay, fromUnixTime } from 'date-fns';
import { addHours } from 'date-fns/esm';
import { zonedTimeToUtc } from 'date-fns-tz';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
  grid: {
    marginTop: spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  alert: {
    margin: spacing(3, 0),
  },
  alertContent: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  alertIcon: {
    alignItems: 'center',
  },
  alertMessage: {
    width: '100%',
  },
  paper: {
    padding: spacing(3),
  },
  cardHeading: {
    marginBottom: 0,
  },
  cardLabel: {
    marginTop: 0,
    marginBottom: 0,
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

/* eslint-disable-next-line */
export interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = observer((props) => {
  const classes = useStyles();
  const { userStore } = useMst();

  const calculateNextSynced = () => {
    console.log(userStore.user_account_status);
    if (userStore.user_account_status === 'pro') {
      const time = zonedTimeToUtc(fromUnixTime(userStore.last_synced), userStore.user_timezone);
      console.log(addHours(time, 1));
      return addHours(time, 1);
    } else {
      return endOfDay(new Date());
    }
  };

  const formatTimeDifference = () => {
    console.log(calculateNextSynced(), new Date());
    const difference = Math.abs(differenceInMinutes(calculateNextSynced(), new Date()));
    console.log(Math.floor(difference / 60));
    const hours = Math.floor(difference / 60);
    const minutes = difference - hours * 60;
    return `In ${hours} hrs and ${minutes} mins`;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2">Welcome back, {userStore.user_first_name}</Typography>
      {userStore.fit_needs_reconnecting !== 'false' && (
        <Alert
          classes={{
            message: classes.alertMessage,
            icon: classes.alertIcon,
          }}
          severity="error"
          className={classes.alert}
        >
          <div className={classes.alertContent}>
            <div className={classes.flexGrow}>You need to reconnect Google Fit.</div>
            <Button>Connect</Button>
          </div>
        </Alert>
      )}
      {userStore.fitbit_needs_reconnecting !== 'true' && (
        <Alert
          classes={{
            message: classes.alertMessage,
            icon: classes.alertIcon,
          }}
          severity="error"
          className={classes.alert}
        >
          <div className={classes.alertContent}>
            <div className={classes.flexGrow}>You need to reconnect Fitbit.</div>
            <Button>Connect</Button>
          </div>
        </Alert>
      )}
      <Grid className={classes.grid} container spacing={3}>
        <Grid item md={2}>
          <Paper className={classes.paper}>
            <Typography className={classes.cardHeading} variant="h4">
              {addCommasToNumber(userStore.steps_synced)}
            </Typography>
            <p className={classes.cardLabel}>Your synced steps</p>
          </Paper>
        </Grid>
        <Grid item md={2}>
          <Paper className={classes.paper}>
            <Typography className={classes.cardHeading} variant="h4">
              {formatTimeDifference()}
            </Typography>
            <p className={classes.cardLabel}>Next sync time</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});

export default Dashboard;
