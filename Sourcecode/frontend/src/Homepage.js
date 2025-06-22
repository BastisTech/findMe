import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  Grid
} from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

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

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <Typography variant="h1" fontWeight="bold">
      {count}
    </Typography>
  );
}

export default function Homepage() {
  const navigate = useNavigate();

  const [itemCount, setItemCount] = useState(10);
  const [foundItemCount, setFoundItemCount] = useState(4);
  const [userCount, setUserCount] = useState(5);
	
	useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);
	
  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />

      <Box
        sx={{
          py: 20,
          textAlign: "center",
          color: "white",
          backgroundImage: "url('/panorama.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>Du hast einen Gegenstand verloren?</Typography>
          <Typography variant="body1" paragraph>
            Hier kannst unsere Liste von verlorenen Gegenständen durchsuchen,
            um dein Eigentum wiederzufinden.
          </Typography>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            <Button sx={{ px: 4, py: 2 }} onClick={() => navigate("/suche")}>Etwas verloren?</Button>
          </Box>
        </Container>
      </Box>

		<Container sx={{ my: 8 }}>
  <Grid container spacing={4} justifyContent="center">
    <Grid xs={12} md={6} sx={{ display: "flex" }}>
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
          pr: 12.5,
          pb: 4,
          pl: 12.5,
        }}
      >
        <AnimatedCounter target={itemCount} />
        <Typography textAlign="center">
          Gegenstände warten <br /> auf ihren Besitzer
        </Typography>
      </Paper>
    </Grid>
    <Grid xs={12} md={6} sx={{ display: "flex" }}>
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
          pr: 9.5,
          pb: 4,
          pl: 9.5,
        }}
      >
        <AnimatedCounter target={foundItemCount} />
        <Typography textAlign="center">
          Gegenstände wurden bereits <br /> von ihren Besitzern abgeholt
        </Typography>
      </Paper>
    </Grid>
  </Grid>
</Container>



      <Footer />
    </ThemeProvider>
  );
}
