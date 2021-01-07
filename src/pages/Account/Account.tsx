import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import { useMst } from '../../stores';
import Stripe from 'stripe';

enum SubscriptionStatus {
  CANCEL_END_OF_PERIOD = 'Active - Cancel at Billing Period End',
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
  form: {
    marginTop: spacing(3),
  },
  section: {
    padding: spacing(2, 0),
  },
}));

/* eslint-disable-next-line */
export interface AccountProps {}

export const Account: React.FC<AccountProps> = observer((props) => {
  const { stripeStore, userStore } = useMst();
  const [state, setState] = useState({
    cancelModalOpen: false,
    resumeModalOpen: false,
  });
  const classes = useStyles();

  useEffect(() => {
    stripeStore.getCustomer();
  }, []);

  const subscription = stripeStore.customer.subscriptions
    ? stripeStore.customer.subscriptions.data.filter(
        (subscription) => subscription.status === 'active',
      )[0]
    : null;

  const getDateLocaleString = (date: number) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { timeZone: userStore.user_timezone });
  };

  const getLocaleString = (date: number) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US', { timeZone: userStore.user_timezone });
  };

  const handleModalClose = (modal: string) => setState({ ...state, [modal]: false });

  const handleCancelSubscription = () => {
    stripeStore
      .cancelSubscription(subscription.id)
      .then(() => handleModalClose('cancelModalOpen'))
      .then(() => stripeStore.getCustomer());
  };

  const handleResumeSubscription = () => {
    stripeStore
      .resumeSubscription(subscription.id)
      .then(() => handleModalClose('resumeModalOpen'))
      .then(() => stripeStore.getCustomer());
  };

  const getSubscriptionStatus = (subscription: Stripe.Subscription) => {
    if (subscription.cancel_at_period_end && subscription.status) {
      return SubscriptionStatus.CANCEL_END_OF_PERIOD;
    } else if ((subscription.status = 'active')) {
      return SubscriptionStatus.ACTIVE;
    } else {
      return SubscriptionStatus.CANCELLED;
    }
  };

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <Typography variant="h3">Update your profile</Typography>
        <ProfileForm className={classes.form} />
      </section>
      {subscription && (
        <section className={classes.section}>
          <Typography variant="h3">Subscription</Typography>
          <section className={classes.section}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <b>Pro since</b>
              </Grid>
              <Grid item xs={9}>
                {getDateLocaleString(stripeStore.customer.subscriptions.data[0].start_date * 1000)}
              </Grid>

              <Grid item xs={3}>
                <b>Subscription renewal date</b>
              </Grid>
              <Grid item xs={9}>
                {getLocaleString(subscription.current_period_end * 1000)}
              </Grid>

              <Grid item xs={3}>
                <b>Status</b>
              </Grid>
              <Grid item xs={9}>
                {getSubscriptionStatus(subscription)}
              </Grid>

              <Grid item xs={3}>
                {getSubscriptionStatus(subscription) === SubscriptionStatus.ACTIVE && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setState({ ...state, cancelModalOpen: true })}
                  >
                    Cancel Subscription
                  </Button>
                )}
                {getSubscriptionStatus(subscription) ===
                  SubscriptionStatus.CANCEL_END_OF_PERIOD && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setState({ ...state, resumeModalOpen: true })}
                  >
                    Resume Subscription
                  </Button>
                )}
              </Grid>
            </Grid>
          </section>
        </section>
      )}
      <Dialog
        open={state.cancelModalOpen}
        onClose={() => handleModalClose('cancelModalOpen')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel subscription</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your subscription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalClose('cancelModalOpen')} color="primary">
            No
          </Button>
          <Button onClick={handleCancelSubscription} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={state.resumeModalOpen}
        onClose={() => handleModalClose('resumeModalOpen')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Resume subscription</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to resume your subscription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalClose('resumeModalOpen')} color="primary">
            No
          </Button>
          <Button onClick={handleResumeSubscription} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Account;
