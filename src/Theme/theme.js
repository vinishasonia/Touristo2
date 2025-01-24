import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700, // Bold
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600, // Semi-Bold
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500, // Medium
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500, // Medium
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400, // Regular
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400, // Regular
    },
    subtitle1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
    subtitle2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
    body: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400, // Regular
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600, // Semi-Bold
    },
    caption: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
    overline: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Customize the border radius
          textTransform: 'none', // Prevent automatic uppercase transformation
          padding: '8px 16px', // Customize padding
        },
        contained: {
          boxShadow: 'none', // Remove shadow for contained buttons
          '&:hover': {
            boxShadow: 'none', // Remove shadow on hover
          },
        },
        outlined: {
          borderWidth: 2, // Customize border width for outlined buttons
          '&:hover': {
            borderWidth: 2, // Maintain border width on hover
          },
        },
      },
    },
  },
});

export default theme;
