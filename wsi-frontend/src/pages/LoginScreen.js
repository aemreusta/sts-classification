import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import validateEmail from "../utils/EmailValidation";
import LockIcon from "@mui/icons-material/Lock";

const EDU_MAIL_TEXT = "Please enter your edu mail";

function LoginScreen() {
  const [mail, setMail] = useState("");
  const [helperText, setHelperText] = useState(EDU_MAIL_TEXT);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;

    console.log(validateEmail(newValue));

    if (validateEmail(newValue)) {
      setHelperText("");
    } else {
      setHelperText(EDU_MAIL_TEXT);
    }
    setMail(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!validateEmail(data.get("email"))) {
      setErrorMessage("Please enter a valid email.");
      setError(true);
      return;
    } else {
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        p: 10,
        mb: 2,
        mt: 2,
        borderRadius: 5,
        boxShadow: 5,
        backgroundColor: "#eadec6",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LockIcon
          sx={{ fontSize: 84, margin: "auto", color: "#375d8a", mb: 6 }}
        />

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={mail}
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                helperText={helperText}
                autoComplete="email"
                autoFocus
                error={error}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
            </Grid>

            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={error}
              onClose={() => setError(false)}
              key="errorMessage"
            >
              <Alert
                onClose={() => setError(false)}
                variant="filled"
                severity="error"
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginScreen;
