import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 4, textAlign: "center", backgroundColor: "#f4f4f4", borderTop: "1px solid #ddd" }}>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Link href="/impressum" underline="hover" color="text.secondary">Impressum</Link>
          </Grid>
          <Grid item>
            <Link href="mailto:manager@spengergasse.at" underline="hover" color="text.secondary">Kontakt</Link>			
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          &copy; 2025 Fundamt - FindMe
        </Typography>
      </Container>
    </Box>
  );
}
