import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Alert,
  LinearProgress,
  Snackbar
} from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./components/Loadingcomponent";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c62828",
    },
  },
});

export default function SignInPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const response = await fetch("https://localhost:51645/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Benutzername oder Passwort ist falsch.");
        }
        throw new Error("Ein unbekannter Fehler ist aufgetreten.");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavigationBar />
        <Container component="main" maxWidth="xs" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Anmelden
            </Typography>

            {error && (
              <Alert variant="outlined" severity="error" sx={{ mt: 2, width: "100%" }}>
                {error}
              </Alert>
            )}

              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Benutzername"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Passwort"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Anmelden
                </Button>
              </Box>
          </Box>
        </Container>

        <Snackbar
          open={success}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            mb: 16,
            "& .MuiSnackbarContent-root": {
              animation: "slideUp 0.5s ease-in-out"
            }
          }}
        >
          <Alert severity="success" sx={{ fontSize: "1.1rem", py: 2, px: 4 }}>
            Login erfolgreich!
          </Alert>
        </Snackbar>

        <Footer />

        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(100px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
      </Box>
    </ThemeProvider>
  );
}
