import RingChart from "./components/RingChart";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import MainScreen from "./pages/MainScreen";
import UploadPage from "./pages/UploadScreen";
import LoginScreen from "./pages/LoginScreen";
import BasicModal from "./components/BasicModal";
import TeamScreen from "./pages/TeamScreen";
import MemberCard from "./components/MemberCard";
import ResultScreen from "./pages/ResultScreen";
import { Box, CssBaseline } from "@mui/material";

import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#eff1f5",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="results" replace />} />
          <Route path="/results" element={<ResultScreen />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}
