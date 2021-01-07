import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/TimerTwoTone';
import ToysIcon from '@material-ui/icons/ToysTwoTone';
import PollIcon from '@material-ui/icons/PollTwoTone';
import PowerIcon from '@material-ui/icons/Power';
import SyncIcon from '@material-ui/icons/SyncTwoTone';
import { useMst } from '../../stores';

const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
  stripeElement: {
    border: `3px solid ${palette.grey[200]}`,
    padding: `20px ${spacing(2)}px`,
    borderRadius: 8,
  },
  root: {
    padding: spacing(3),
  },
  paddingTop: {
    paddingTop: spacing(3),
  },
  label: {
    marginBottom: spacing(1),
    display: 'inline-block',
  },
  section: {
    marginBottom: spacing(3),
  },
}));

/* eslint-disable-next-line */
export interface UpgradeProps {}

export const Upgrade: React.FC<UpgradeProps> = observer((props) => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [state, setState] = useState({
    upgradeModalOpen: false,
    firstName: '',
    lastName: '',
  });
  const { stripeStore, userStore } = useMst();

  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);

  const processPaymentMethod = async () => {
    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (!userStore.stripe_customer_id) {
      const customer = await stripeStore.createCustomer(
        state.firstName,
        state.lastName,
        userStore.user_email,
      );

      await userStore.updateUserProfile({
        user_first_name: userStore.user_first_name,
        user_email: userStore.user_email,
        stripe_customer_id: customer.id,
      });
    }

    await stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      .then((result) => {
        if (result.error) {
          setCardError(result.error.message);
          setLoading(false);
          // displayError(error);
        } else {
          const paymentId = result.paymentMethod.id;

          stripeStore
            .createSubscription(stripeStore.customer.id, paymentId, 'monthly_133')
            .then(() => {
              handleModalClose('upgradeModalOpen');
              setState({ ...state, firstName: '', lastName: '' });
            });
        }
      });
  };

  const handleModalOpen = (modal: string) => setState({ ...state, [modal]: true });
  const handleModalClose = (modal: string) => {
    setState({ ...state, [modal]: false, firstName: '', lastName: '' });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3">Thinking about upgrading?</Typography>
      <List>
        <ListSubheader>Upgrading gets you:</ListSubheader>
        <ListItem>
          <ListItemIcon>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText
            primary="1 interval hour syncing"
            secondary="We'll sync your steps every hour instead of every 24 hours."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <ListItemText
            primary="On-demand sync"
            secondary="Just press the button and we'll sync your steps for you."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ToysIcon />
          </ListItemIcon>
          <ListItemText
            primary="Test new features"
            secondary="We've got new features coming. You'll get to test them first. (See below)."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PollIcon />
          </ListItemIcon>
          <ListItemText
            primary="Vote on new integrations"
            secondary="We'll prioritize the fitness integrations you want most."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PowerIcon />
          </ListItemIcon>
          <ListItemText
            primary="Use more than one integration at a time (upcoming)"
            secondary="Integrate your fitness data between more than one connection."
          />
        </ListItem>
      </List>

      <Typography variant="h3"></Typography>
      <List>
        <ListSubheader>Upcoming features:</ListSubheader>
        <ListItem>
          <ListItemIcon>
            <PowerIcon />
          </ListItemIcon>
          <ListItemText
            primary="New integrations"
            secondary="Try new integrations before everyone else."
          />
        </ListItem>
      </List>

      {!!!stripeStore.subscriptions.length && (
        <div className={classes.paddingTop}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleModalOpen('upgradeModalOpen')}
          >
            Upgrade for $1/mo
          </Button>
          <p>
            <i>* Cancel anytime</i>
          </p>
        </div>
      )}

      {!!stripeStore.subscriptions.length && (
        <Typography variant="subtitle1">
          <i>Thank you for upgrading! Go to Account to view subscription details.</i>
        </Typography>
      )}

      <Dialog
        open={state.upgradeModalOpen}
        onClose={() => handleModalClose('upgradeModalOpen')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Upgrade account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter your billing information below.
          </DialogContentText>

          <div className={classes.section}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={state.firstName}
                  onChange={(event) => setState({ ...state, firstName: event.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={state.lastName}
                  onChange={(event) => setState({ ...state, lastName: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <label className={classes.label} htmlFor="cardNumber">
                  Card Number
                </label>

                <CardElement id="cardNumber" className={classes.stripeElement} />

                {cardError && (
                  <Typography color="error" variant="body1">
                    {cardError}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalClose('upgradeModalOpen')} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!state.firstName && !state.lastName && cardError}
            onClick={processPaymentMethod}
            color="primary"
            autoFocus
          >
            Start Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default Upgrade;
