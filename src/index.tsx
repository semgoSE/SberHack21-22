import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AccountState } from './context/Account';
import { createTheme, ThemeProvider } from '@mui/material';

import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#068441"
    },
  },
  typography: {
    subtitle2: {
      fontWeight: 700,
    },
    body2: {
      color: "rgb(99, 115, 129)"
    },
    h4: {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: 700
    }
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "6px 16px",
          borderRadius: 10,
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontWeight: 700
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px"
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <AccountState>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AccountState>
  </React.StrictMode>,
  document.getElementById('root')
);

