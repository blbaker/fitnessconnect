import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { breakpoints } from './breakpoints';
import { color } from './color';
import { palette } from './palette';

export const defaultTheme: Theme = createMuiTheme({
  breakpoints: {
    values: breakpoints,
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
      default: palette.gray200,
    },
  },
  props: {
    MuiGrid: {
      xs: 12,
    },
  },
});
