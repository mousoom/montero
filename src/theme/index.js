import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#00ab55'
    },
    text: {
      primary: '#111',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
