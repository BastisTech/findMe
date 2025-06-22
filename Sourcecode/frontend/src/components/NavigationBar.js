import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Snackbar,
  Alert,
  LinearProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../components/Loadingcomponent';

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setLoading(true);
    setLogoutSuccess(true);
	
    setTimeout(() => {
      localStorage.removeItem("user");
	  setLoading(false);
	  
	  if(window.location.pathname === "/"){
		window.location.reload();
	  } else{
		navigate("/");
	  }
    }, 1000);
  };

  const navButtons = [
    { label: 'Service', path: '/service', visible: userRole === "Admin" || userRole === "Verwalter" },
    { label: 'Etwas verloren?', path: '/suche', visible: true },
  ];

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
  <Typography
    variant="h6"
    sx={{ cursor: 'pointer', color: '#c62828' }}
    onClick={() => handleNavigate('/')}
  >
    FindMe
  </Typography>

  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      color="inherit"
      edge="end"
      onClick={() => setOpen(true)}
    >
      <MenuIcon />
    </IconButton>
  </Box>

  <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
  {navButtons
    .filter(btn => btn.visible)
    .map((item) => (
      <Button
        key={item.label}
        color="primary"
        variant="contained"
        onClick={() => handleNavigate(item.path)}
      >
        {item.label}
      </Button>
    ))}
  {user ? (
    <Button color="primary" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button color="primary" variant="contained" onClick={() => handleNavigate('/login')}>
      Login
    </Button>
  )}
  </Box>
</Toolbar>
        {loading && (
          <LinearProgress
            color="primary"
            sx={{
              position: "fixed",
              top: 64,
              left: 0,
              width: "100%",
              zIndex: 1201
            }}
          />
        )}
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {navButtons
              .filter(btn => btn.visible)
              .map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton onClick={() => handleNavigate(item.path)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={user ? handleLogout : () => handleNavigate("/login")}
              >
                <ListItemText primary={user ? "Logout" : "Login"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Snackbar
        open={logoutSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          mb: 16,
          "& .MuiSnackbarContent-root": {
            animation: "slideUp 0.5s ease-in-out"
          }
        }}
      >
        <Alert severity="success" sx={{ fontSize: "1.1rem", py: 2, px: 4 }}>
          Erfolgreich ausgeloggt!
        </Alert>
      </Snackbar>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
