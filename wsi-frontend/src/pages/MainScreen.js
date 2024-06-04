import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const MainScreen = () => {
  return (
    <Container
      maxWidth="false"
      style={{
        backgroundImage: `url('https://www.itnonline.com/sites/default/files/field/image/Screen%20Shot%202019-10-09%20at%209.00.14%20PM.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "calc(100vh - 64px)",
        minWidth: "calc(100vh)",
        position: "relative",
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Typography sx={{ m: 3, fontWeight: "bold", color: "white" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum
          iaculis ligula vel egestas.
        </Typography>
        <Button
          variant="contained"
          sx={{
            right: "100px",
            position: "absolute",
            display: "flex",
            paddingX: "30px",
            backgroundColor: "rgba(241, 96, 69, 0.8)",
          }}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default MainScreen;
