import React from "react";
import {
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
  Link
} from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

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

export default function ImpressumPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavigationBar />
        <Container sx={{ flex: "1 0 auto", mt: 8, mb: 8 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Impressum
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} paragraph>
            Offenlegungspflicht laut §25 Mediengesetz
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }} paragraph>
            Medieninhaber und Herausgeber:
          </Typography>
          <Typography variant="body1" paragraph>
            Höhere Technische Bundeslehr- und Versuchsanstalt für Textilindustrie und Informatik (kurz: HTL Spengergasse)<br />
            vertreten durch Direktor Dr. Gerhard Hager<br />
            Spengergasse 20<br />
            1050 Wien – Österreich<br />
            Tel: +43 1 54615 0<br />
            E-Mail:{" "}
            <Link href="mailto:manager@spengergasse.at" color="primary">
              manager@spengergasse.at
            </Link>
            <br />
            UID: ATU37866706<br />
            IBAN: AT70 0100 0000 0503 0886
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }} paragraph>
            Aufsichtsbehörde:
          </Typography>
          <Typography variant="body1" paragraph>
            Bundesministerium für Bildung, Wissenschaft und Forschung
          </Typography>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
