import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
  Container,
  Autocomplete,
  Grid,
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { useLoading } from "./components/Loadingcomponent";

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

function ItemGrid({ searchName, selectedCategory, selectedLocation, onSelect }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://localhost:51645/api/item/mapped")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesLocation = !selectedLocation || item.location === selectedLocation;
    return matchesName && matchesCategory && matchesLocation;
  });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {[...filteredItems].reverse().map((item) => (
        <Box key={item.itemId} sx={{ width: "23.9%", minWidth: 240, mt: 2, mb: 9 }}>
          <Card
            onClick={() => onSelect(item)}
            sx={{
              height: "100%",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 160,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={item.imagePath ? item.imagePath : "/NoImage.jpg"}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/NoImage.jpg";
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
            <CardContent sx={{ width: "100%" }}>
              <Typography variant="h6" gutterBottom noWrap>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.location}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

function ItemModal({ item, onClose }) {
  const [showFullImage, setShowFullImage] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!item) return null;

const handleDelete = async () => {
  const res = await fetch(`https://localhost:51645/api/item/claim/${item.itemId}`, {
    method: "PUT"
  });

  if (res.ok) {
    setConfirmDelete(false);
    onClose();
  } else {
    alert("Claimen fehlgeschlagen.");
  }
};



const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Modal open={Boolean(item)} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            overflowY: "auto",
            position: "relative"
          }}
        >
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              width: "100%",
              maxWidth: 800,
              mx: "auto",
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.imagePath ? item.imagePath : "/NoImage.jpg"}
              alt="Vorschau"
              onClick={() => setShowFullImage(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/NoImage.jpg";
              }}
              style={{
                maxWidth: "100%",
                maxHeight: "60vh",
                objectFit: "contain",
                cursor: "zoom-in",
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Informationen:</Typography>
            <Typography><strong>Funddatum:</strong> {new Date(item.foundDate).toLocaleDateString()}</Typography>
            <Typography><strong>Kategorie:</strong> {item.category}</Typography>
            <Typography><strong>Raum:</strong> {item.location}</Typography>
          </Box>

          {item.description && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Beschreibung:</Typography>
              <Typography sx={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
				  {item.description}
			  </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {(user?.role === "Admin" || user?.role === "Verwalter") && (
				<Button color="error" onClick={() => setConfirmDelete(true)}>
          Claim
				</Button>
			)}
          </Box>
        </Box>
      </Modal>

      <Modal open={showFullImage} onClose={() => setShowFullImage(false)}>
        <Box
          onClick={() => setShowFullImage(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
          }}
        >
          <img
            src={item.imagePath ? item.imagePath : "/NoImage.jpg"}
            alt="Vollbild"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/NoImage.jpg";
            }}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>

      {/* Bestätigungsdialog */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Item claimen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Willst du diesen Gegenstand wirklich als abgeholt markieren?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Abbrechen</Button>
          <Button onClick={handleDelete} color="error">Claim</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default function SuchePage() {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
	  setLoading(false);
    fetch("https://localhost:51645/api/category")
      .then((res) => res.json())
      .then((data) => setCategoryOptions(data.map((c) => c.name)))
      .catch(console.error);

    fetch("https://localhost:51645/api/location")
      .then((res) => res.json())
      .then((data) => setLocationOptions(data.map((l) => l.name)))
      .catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavigationBar />
        <Container sx={{ flex: "1 0 auto", mt: 4 }}>
          <Box sx={{ maxWidth: 2000, mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Nach Name suchen"
                variant="outlined"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                sx={{ flex: 3, minWidth: 400 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Autocomplete
                options={categoryOptions}
                value={selectedCategory}
                onChange={(e, val) => setSelectedCategory(val || "")}
                renderInput={(params) => (
                  <TextField {...params} label="Kategorie filtern" />
                )}
                sx={{ flex: 1, minWidth: 150 }}
              />
              <Autocomplete
                options={locationOptions}
                value={selectedLocation}
                onChange={(e, val) => setSelectedLocation(val || "")}
                renderInput={(params) => (
                  <TextField {...params} label="Raum filtern" />
                )}
                sx={{ flex: 1, minWidth: 150 }}
              />
            </Box>
            <ItemGrid
              searchName={searchName}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              onSelect={(item) => setSelectedItem(item)}
            />
          </Box>
        </Container>
        <Footer />
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </Box>
    </ThemeProvider>
  );
}
