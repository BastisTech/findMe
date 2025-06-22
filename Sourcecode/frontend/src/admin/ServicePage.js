import React from "react";
import { Box, Button, Typography, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c62828",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
  },
});

export default function ServicePage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavigationBar />
        <Box
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom>Service Auswahl</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              px: 4,
              width: "100%",
              maxWidth: "1400px",
            }}
          >
            <Button
              onClick={() => navigate("/admin")}
              sx={{
                flex: 1,
                height: 200,
                fontSize: "1.5rem",
                backgroundColor: "transparent",
                border: "3px solid #c62828",
                color: "#c62828",
                "&:hover": {
                  backgroundColor: "#ffe5e5",
                },
              }}
            >
              Verwaltung
            </Button>
            <Button
              onClick={() => navigate("/formular")}
              sx={{
                flex: 1,
                height: 200,
                fontSize: "1.5rem",
                backgroundColor: "transparent",
                border: "3px solid #c62828",
                color: "#c62828",
                "&:hover": {
                  backgroundColor: "#ffe5e5",
                },
              }}
            >
              Gegenstand hinzufügen
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
