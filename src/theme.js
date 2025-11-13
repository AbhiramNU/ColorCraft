import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7d5fff',
    },
    background: {
      default: '#181818',
      paper: '#242424',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
});

export default theme;
