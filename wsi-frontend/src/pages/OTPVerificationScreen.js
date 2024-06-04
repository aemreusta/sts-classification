import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

function OTPVerificationScreen() {
  const [otp, setOtp] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const handleSubmit = () => {};

  useEffect(() => {
    if (otp.length === 4) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [otp]);

  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleResendClick = () => {
    setCountdown(30);
    setResendDisabled(true);
  };

  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown, resendDisabled]);

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
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Grid item>
          <Typography variant="h4">OTP Code Verification</Typography>
        </Grid>
        <Grid item sx={{ width: "70%" }}>
          <TextField
            label="Enter OTP Code"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/, "").slice(0, 4))
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled}
            onClick={(e) => handleSubmit}
            sx={{ paddingLeft: 15, paddingRight: 15, pt: 1, pb: 1 }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            disabled={resendDisabled}
            onClick={handleResendClick}
            sx={{ paddingLeft: 11, paddingRight: 11, pt: 1, pb: 1 }}
          >
            Resend Code {resendDisabled ? countdown + "s" : " "}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OTPVerificationScreen;
