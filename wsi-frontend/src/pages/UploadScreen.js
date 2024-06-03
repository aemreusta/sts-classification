import React, { useState } from "react";
import FileUpload from "../layouts/FileUpload";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const buttonStyle = {
  backgroundColor: "#375d8a",
  color: "white",
  marginTop: "30px",
  paddingRight: "25px",
  paddingLeft: "25px",
  "&:hover": {
    backgroundColor: "grey",
    color: "white",
  },
};

export default function FileUploadPage() {
  const [upload, setUpload] = useState(false);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fileUploadProps = {
    accept: "image/*",
    onChange: async (event) => {
      if (event.target.files !== null && event.target.files.length > 0) {
        console.log(`Saving ${event.target.value}`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setFileName(event.target.value);
        setUpload(true);
      }
    },
    onDrop: (event) => {
      console.log(`Drop ${event.dataTransfer.files[0].name}`);
      setUpload(false);
    },
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              border: "5px dashed grey",
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: 1,
            }}
          >
            {upload ? (
              <Box
                sx={{
                  width: "600px",
                  height: "100px",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ThumbUpAltIcon sx={{ fontSize: 64, color: "lightgreen" }} />
                <Typography sx={{ mt: 2 }}>{fileName}</Typography>
              </Box>
            ) : (
              <FileUpload {...fileUploadProps} />
            )}
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={loading}
              sx={buttonStyle}
              onClick={async () => {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 15000));
                setLoading(false);
                navigate("/results");
              }}
            >
              Upload
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Paper
            elevation={3}
            sx={{
              padding: 6,
              margin: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Usage
            </Typography>
            <Typography variant="body1">
              When you upload your whole-slide image (WSI), our system processes
              it through deep learning algorithms. We break down the image into
              smaller tiles and analyze them for relevant patterns and
              structures. Each tile is classified, and we provide the most
              likely category and a probability score. These individual
              predictions are then aggregated to give you an overall result for
              the entire image. Our system aims to offer rapid, accurate
              insights, supporting medical professionals in their diagnostics
              and research. The results are presented in a user-friendly format
              and are ready for further analysis and decision making. Choose our
              system for cutting-edge technology and precise image analysis.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
