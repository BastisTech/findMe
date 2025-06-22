import React from 'react';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',
    },
  },
});

export default function NotFoundPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavigationBar />
        <Box
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" color="primary" sx={{ fontSize: '10rem', fontWeight: 'bold' }}>
            404
          </Typography>
		  <Typography variant="h3" sx={{ mt: 2 }}>
            Seite wurde nicht gefunden
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Die Seite, die du suchst, gibt es leider nicht (mehr).
          </Typography>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
