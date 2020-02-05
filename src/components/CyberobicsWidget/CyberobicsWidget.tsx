import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export const CyberobicsWidget: React.FC = () => {
  const { theme } = useTheme();
  const classes = useStyles(theme);
  return (
    <Paper>
      <div className={classes.root}>
        <Typography variant="h2">Cyberobics</Typography>
        <Typography variant="body1">An example of a hidable feature.</Typography>
      </div>
    </Paper>
  );
};

export default CyberobicsWidget;
