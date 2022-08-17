import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

const Footer = () => {
  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <footer
      className="text-black text-center mainback bg-slate-100 pt-12 pb-8"
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
      }}
    >
      <Container>
        <Box>Copyright © Chance Onyiorah</Box>
      </Container>
      <Fab
        sx={{
          left: "auto",
          right: 20,
          bottom: 20,
          top: "auto",
          position: "fixed",
        }}
        onClick={scrollToTop}
        color="primary"
      >
        <NavigationIcon />
      </Fab>
    </footer>
  );
};

export default Footer;
