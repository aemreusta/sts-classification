import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { brown } from "@mui/material/colors";
// import { useAuth } from "../providers/AuthProvider";

// import { logoutService } from "../services/AuthService";
import LogoutIcon from "@mui/icons-material/Logout";

function ResponsiveAppBar() {
  // const { logout } = useAuth();

  const handleCloseUserMenu = async (event) => {
    // const responseStatus = await logoutService();
    // if (responseStatus === 200) {
    //   logout();
    // }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#375d8a", width: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src="/logo.png"
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/results"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Results
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/upload"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Upload
          </Typography>
          <Box sx={{ flexGrow: 0, pl: 3 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleCloseUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: brown[500] }}>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
