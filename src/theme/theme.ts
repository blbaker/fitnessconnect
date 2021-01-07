import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { breakpoints } from './breakpoints';
import { color } from './color';
import { palette } from './palette';
import { fontSize } from './typography';

export const defaultTheme: Theme = createMuiTheme({
  breakpoints: {
    values: breakpoints,
  },
  typography: {
    fontFamily: `'Apertura', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'`,
    fontWeightBold: 700,
    fontSize: fontSize.default,
    h1: {
      fontSize: fontSize.h1,
    },
    h2: {
      fontSize: fontSize.h2,
    },
    h3: {
      fontSize: fontSize.h3,
    },
    h4: {
      fontSize: fontSize.h4,
    },
    h5: {
      fontSize: fontSize.h5,
    },
    body1: {
      fontSize: fontSize.default,
    },
  },
  palette: {
    primary: {
      main: color.primary,
    },
    secondary: {
      main: color.secondary,
    },
    error: {
      main: color.danger,
    },
    warning: {
      main: color.warning,
    },
    info: {
      main: color.info,
    },
    success: {
      main: color.success,
    },
    grey: {
      100: palette.gray100,
      200: palette.gray200,
      300: palette.gray300,
      400: palette.gray400,
      500: palette.gray500,
      600: palette.gray600,
      700: palette.gray700,
      800: palette.gray800,
      900: palette.gray900,
    },
    text: {
      primary: color.bodyColor,
    },
    background: {
      default: palette.white,
    },
  },
  props: {
    MuiGrid: {
      xs: 12,
    },
    MuiTextField: {
      variant: 'filled',
    },
  },
});
