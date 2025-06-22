// Importierungen
import React, { useState, useEffect } from "react";
import {
  Box, Button, Card, CardContent, Stepper, Step, StepLabel, TextField,
  Typography, ThemeProvider, createTheme, Collapse, Modal, Autocomplete,
  Alert, LinearProgress, Snackbar
} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../components/Loadingcomponent";

// Theme
const theme = createTheme({
  palette: {
    primary: { main: "#c62828" },
  },
});

// Schritte
const steps = ["Wann und wo?", "Beschreibung", "Bild"];

export default function FindMEForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [item, setItem] = useState({
    name: "", categoryName: "", locationName: "",
    foundDate: new Date().toISOString().split("T")[0],
    imagePath: "", description: ""
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [stepErrors, setStepErrors] = useState([false, false, false]);
  const [stepErrorMessages, setStepErrorMessages] = useState(["", "", ""]);
  const [stepCompleted, setStepCompleted] = useState([false, false, false]);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [success, setSuccess] = useState(false);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:51645/api/category").then(res => res.json()).then(setCategories);
    fetch("https://localhost:51645/api/location").then(res => res.json()).then(setLocations);
  }, []);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const validateStep = (step) => {
    let isValid = true;
    const newMessages = [...stepErrorMessages];
    if (step === 0) {
      const today = new Date().toISOString().split("T")[0];
      if (!item.foundDate || !item.locationName) {
        isValid = false;
        newMessages[step] = "Bitte alle Pflichtfelder ausfüllen";
      } else if (item.foundDate > today) {
        isValid = false;
        newMessages[step] = "Das Funddatum darf nicht in der Zukunft liegen.";
      } else newMessages[step] = "";
    } else if (step === 1) {
      if (!item.name || !item.categoryName) {
        isValid = false;
        newMessages[step] = "Bitte alle Pflichtfelder ausfüllen";
      } else if (item.description.length > 300) {
        isValid = false;
        newMessages[step] = "Die Beschreibung darf maximal 300 Zeichen enthalten.";
      } else newMessages[step] = "";
    } else if (step === 2) {
      if (imageFiles.length === 0) {
        isValid = false;
        newMessages[step] = "Bitte lade ein Bild hoch.";
      } else newMessages[step] = "";
    }

    const errors = [...stepErrors];
    const completed = [...stepCompleted];
    errors[step] = !isValid;
    completed[step] = isValid;
    setStepErrorMessages(newMessages);
    setStepErrors(errors);
    setStepCompleted(completed);
    return isValid;
  };

  const handleNext = () => validateStep(activeStep) && setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

	  const handleSubmit = async () => {
	  if (!validateStep(2)) return;
	  let imagePath = "";
	  setLoading(true);

	  try {
		const form = new FormData();
		form.append("file", imageFiles[0]);
		const up = await fetch("https://localhost:51645/api/item/upload-image", {
		  method: "POST", body: form
		});
		if (up.ok) {
		  const { imagePath: url } = await up.json();
		  imagePath = url;
		} else throw new Error("Upload fehlgeschlagen");

		const payload = { ...item, imagePath };
		const res = await fetch("https://localhost:51645/api/item/mapped", {
		  method: "POST", headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(payload)
		});

		if (!res.ok) throw new Error("Speichern fehlgeschlagen");

		setSuccess(true);

		setTimeout(() => {
		  navigate("/suche");
		  // Kein setLoading(false) hier – das macht SuchePage
		}, 3000);
	  } catch (err) {
		alert(err.message);
		setLoading(false); // nur bei Fehler
	  }
	};


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NavigationBar />
        <Box sx={{ flex: "1 0 auto", width: "50%", mx: "auto", mt: 8 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, i) => (
              <Step key={label} completed={stepCompleted[i]}>
                <StepLabel
                  error={stepErrors[i]}
                  optional={<Collapse in={stepErrors[i]}><Typography color="error" variant="caption">{stepErrorMessages[i]}</Typography></Collapse>}
                  onClick={() => (i <= activeStep || validateStep(activeStep)) && setActiveStep(i)}
                  sx={{ cursor: "pointer" }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Card sx={{ mt: 4 }}>
            <CardContent>
              {activeStep === 0 && (
                <Box sx={{ display: "grid", gap: 2 }}>
                  <TextField type="date" name="foundDate" label="Funddatum" InputLabelProps={{ shrink: true }} value={item.foundDate} onChange={handleChange} />
                  <Autocomplete
                    options={locations.map(l => l.name)}
                    value={item.locationName}
                    onChange={(e, val) => setItem({ ...item, locationName: val || "" })}
                    renderInput={(params) => <TextField {...params} label="Standort" required size="small" />}
                    fullWidth disableClearable
                  />
                </Box>
              )}
              {activeStep === 1 && (
                <Box sx={{ display: "grid", gap: 2 }}>
                  <TextField name="name" label="Name" value={item.name} onChange={handleChange} inputProps={{ maxLength: 25 }} />
                  <Autocomplete
                    options={categories.map(c => c.name)}
                    value={item.categoryName}
                    onChange={(e, val) => setItem({ ...item, categoryName: val || "" })}
                    renderInput={(params) => <TextField {...params} label="Kategorie" required size="small" />}
                    fullWidth disableClearable
                  />
				  <TextField
					  name="description"
					  label="Beschreibung (max. 300 Zeichen)"
					  multiline
					  rows={4}
					  value={item.description}
					  onChange={handleChange}
					  inputProps={{ maxLength: 300 }}
					/>

                </Box>
              )}
              {activeStep === 2 && (
                <Box sx={{ display: "grid", gap: 2 }}>
                  <Button variant="contained" component="label" disabled={imageFiles.length >= 1}>
                    Bild auswählen (max. 1)
                    <input
                      type="file" hidden accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
                        if (!validTypes.includes(file.type)) {
                          alert("Nur Bilddateien erlaubt.");
                          return;
                        }
                        setImageFiles([file]);
                        setItem({ ...item, imagePath: file.name });
                        const id = file.name;
                        let progress = 0;
                        const interval = setInterval(() => {
                          progress += Math.floor(Math.random() * 15) + 5;
                          if (progress >= 100) {
                            progress = 100;
                            clearInterval(interval);
                          }
                          setUploadProgress(prev => ({ ...prev, [id]: progress }));
                        }, 150);
                      }}
                    />
                  </Button>

                  <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
                    {imageFiles.map((file, index) => (
                      <Box key={index} sx={{
                        position: "relative", width: 320, height: 320, minWidth: 320,
                        border: "1px solid #ccc", borderRadius: 1, overflow: "hidden"
                      }}>
                        <img
                          src={URL.createObjectURL(file)} alt={`Bild ${index + 1}`}
                          style={{ width: "100%", height: "80%", objectFit: "cover" }}
                          onClick={() => setPreviewImage(URL.createObjectURL(file))}
                        />
                        {uploadProgress[file.name] < 100 && (
                          <Box sx={{ width: "100%", mt: 0.5 }}>
                            <Box sx={{
                              height: 4, width: `${uploadProgress[file.name] || 0}%`,
                              backgroundColor: "#c62828", transition: "width 0.2s ease"
                            }} />
                          </Box>
                        )}
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageFiles([]);
                            setUploadProgress({});
                            setItem({ ...item, imagePath: "" });
                          }}
                          sx={{
                            position: "absolute", top: 0, right: 0, color: "#fff",
                            backgroundColor: "rgba(0,0,0,0.6)", fontSize: "0.75rem",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }
                          }}
                        >✕</Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Zurück</Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep < steps.length - 1 ? (
                  <Button onClick={handleNext}>Weiter</Button>
                ) : (
                  <Button onClick={handleSubmit}>Speichern</Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

<Modal open={!!previewImage} onClose={() => setPreviewImage(null)}>
  <Box
    sx={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90vw",
      maxHeight: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      outline: "none",
      backgroundColor: "transparent"
    }}
  >
    <Box sx={{ position: "relative" }}>
      <img
        src={previewImage}
        alt="Vorschau"
        style={{
          maxWidth: "100vw",
          maxHeight: "90vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: "4px"
        }}
      />
      <Button
        onClick={() => setPreviewImage(null)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          minWidth: "32px",
          padding: "4px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.8)"
          }
        }}
      >
        ✕
      </Button>
    </Box>
  </Box>
</Modal>




        <Snackbar
		  open={success}
		  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		  sx={{
			mb: 16, // höherer Abstand zum Footer
			"& .MuiSnackbarContent-root": {
			  animation: "slideUp 0.5s ease-in-out"
			}
		  }}
		>
		  <Alert severity="success" sx={{ fontSize: "1.1rem", py: 2, px: 4 }}>
			Gegenstand erfolgreich gespeichert!
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

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
