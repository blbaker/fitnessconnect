import React, { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import background from './background.jpg';
import transfer from './transfer.png';
import { color } from '../../theme';
import { useMst } from '../../stores';
import { Button } from '@material-ui/core';

/* eslint-disable-next-line */
export interface HomeProps {}
const useStyles = makeStyles(({ spacing, palette }) => ({
  header: {
    height: '40vh',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    backgroundColor: color.dark,
    color: color.light,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: spacing(4),
  },
  title: {
    position: 'relative',
    display: 'block',
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  wallpaper: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: '0.25',
    zIndex: 0,
    top: 0,
  },
  section: {
    paddingTop: spacing(6),
    paddingBottom: spacing(6),
    position: 'relative',
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  marginTop_x2: {
    marginTop: spacing(3),
  },
  marginTop: {
    marginTop: spacing(1),
  },
  bgLight: {
    backgroundColor: color.light,
  },
}));

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles();
  const { metadataStore } = useMst();
  useEffect(() => {
    metadataStore.getTotalSteps();
  }, [metadataStore]);
  const intToString = (value) => {
    const suffixes = ['', 'thousand', 'million', 'billion', 'trillion'];
    const suffixNum = Math.floor(`${value}`.length / 3);
    let shortValue = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2),
    );
    if (shortValue % 1 !== 0) {
      shortValue = +shortValue.toFixed(1);
    }
    return `${shortValue} ${suffixes[suffixNum]}`;
  };
  return (
    <div>
      <div>
        <div className={`${classes.section} ${classes.header}`}>
          <div className={classes.wallpaper}></div>
          <Typography variant="h3" className={classes.title}>
            Sync your step data from Google Fit to Fitbit.
          </Typography>
        </div>

        <div className={`${classes.section} ${classes.bgLight}`}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Your steps, where you want them
          </Typography>

          <Typography
            variant="h4"
            className={`${classes.sectionTitle} ${classes.marginTop_x2} ${classes.uppercase}`}
          >
            {intToString(metadataStore.totalSteps)}
          </Typography>

          <Typography variant="h6" className={classes.uppercase}>
            Steps synced to Fitbit
          </Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>
            How does it work?
          </Typography>

          <Typography className={classes.marginTop} variant="body1">
            Simply link your Fitbit and Google Fit account <br />
            and we’ll take care of the rest.
          </Typography>

          <img
            className={classes.marginTop_x2}
            src={transfer}
            alt="Transfer Google Fit steps to Fitbit"
          />

          <Typography className={classes.marginTop_x2} variant="body1">
            Steps are synced once per day for free users and every hour for subscribers.
          </Typography>
        </div>

        <div className={`${classes.section} ${classes.bgLight}`}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Ready to get started?
          </Typography>

          <Button className={classes.marginTop_x2} variant="contained" color="primary">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
