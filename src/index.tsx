import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AccountState } from './context/Account';
import { createTheme, ThemeProvider } from '@mui/material';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#068441"
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold"
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold"
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 700,
      textTransform: "uppercase",
      fontSize: "1.2rem"
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: "1rem"
    },
    body1: {
      
    },
    body2: {
      color: "rgb(99, 115, 129)"
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
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none"
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

