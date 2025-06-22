import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ThemeProvider,
  createTheme,
  Container,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

function SimpleForm({ title, endpoint }) {
  const [input, setInput] = useState({ name: "" });
  const handleChange = (e) => setInput({ name: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://localhost:51645/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      alert(`${title} erfolgreich gespeichert`);
      setInput({ name: "" });
    } else {
      alert("Fehler beim Speichern");
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6">{title} erstellen</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "grid", gap: 2 }}>
          <TextField name="name" label="Name" value={input.name} onChange={handleChange} required />
          <Button type="submit">Speichern</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function SimpleList({ title, endpoint }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, name: null });
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = () => {
    fetch(`https://localhost:51645/api/${endpoint}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
  const visibleData = expanded ? filtered : filtered.slice(0, 5);

  const handleDelete = async () => {
    try {
      if (!deleteDialog.name) return;

      const res = await fetch(`https://localhost:51645/api/${endpoint}/${encodeURIComponent(deleteDialog.name)}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setData(data.filter(el => el.name !== deleteDialog.name));
        setDeleteDialog({ open: false, name: null });
        setErrorMsg("");
      } else {
        const msg = await res.text();
        setErrorMsg(msg || "Löschen fehlgeschlagen.");
      }
    } catch (err) {
      setErrorMsg("Serverfehler: " + err.message);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialog({ open: false, name: null });
    setErrorMsg("");
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <TextField
          label="Suchen"
          fullWidth
          sx={{ my: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List>
          {visibleData.map((el) => (
            <ListItem key={el.name} divider>
              <ListItemText primary={el.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => setDeleteDialog({ open: true, name: el.name })}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography
          onClick={() => setExpanded(!expanded)}
          sx={{ color: "red", textDecoration: "underline", cursor: "pointer", mt: 1 }}
        >
          {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        </Typography>
      </CardContent>

      <Dialog open={deleteDialog.open} onClose={handleCloseDialog}>
        <DialogTitle>Löschen bestätigen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchtest du diesen Eintrag wirklich löschen?
          </DialogContentText>
          {errorMsg && (
            <Typography sx={{ color: "error.main", mt: 2 }}>{errorMsg}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Nein</Button>
          <Button onClick={handleDelete} autoFocus>Ja</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}



export default function AdminPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavigationBar />
        <Container sx={{ flex: "1 0 auto", mt: 4 }}>
          <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            <SimpleForm title="Kategorie" endpoint="category" />
            <SimpleForm title="Raum" endpoint="location" />
            <SimpleList title="Kategorien" endpoint="category" />
            <SimpleList title="Räume" endpoint="location" />
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
