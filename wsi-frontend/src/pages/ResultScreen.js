import React, { useState } from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Button,
  Switch,
  CssBaseline,
  Box,
} from "@mui/material";
import RingChart from "../components/RingChart";

const modalContentStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  witdh: "100vh",
  overflow: "hidden",
  flexDirection: "column",
};

const modalImageStyle = {
  maxWidth: "100%",
  maxHeight: "95%",
  objectFit: "contain",
  cursor: "grab",
};

const ResultScreen = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isAnnotated, setIsAnnotated] = useState(false);

  const items = [
    {
      title: "Result 1",
      date: "15 Oct 2023",
      content: [
        { id: 0, value: 26.18860050762708, label: "Dediferansiye Liposarkom" },
        { id: 1, value: 4.953249500947124, label: "Leiomyosarkom" },
        { id: 2, value: 66.37719065900176, label: "MPSKT" },
        { id: 3, value: 2.4809594975475247, label: "Sinoviyal Sarkom" },
      ],
      raw_image: "raw_images/00_00.jpg",
      image: "processed_images/00_00_annotated.jpg",
    },
    {
      title: "Result 2",
      date: "15 Oct 2023",
      content: [
        { id: 0, value: 59.08337259621504, label: "Dediferansiye Liposarkom" },
        { id: 1, value: 6.903784845419807, label: "Leiomyosarkom" },
        { id: 2, value: 32.802192886388964, label: "MPSKT" },
        { id: 3, value: 1.2106493338890467, label: "Sinoviyal Sarkom" },
      ],
      raw_image: "raw_images/01_00.jpg",
      image: "processed_images/01_00_annotated.jpg",
    },
    {
      title: "Result 3",
      date: "15 Oct 2023",
      content: [
        { id: 0, value: 50.09827959246201, label: "Dediferansiye Liposarkom" },
        { id: 1, value: 4.7999201118390684, label: "Leiomyosarkom" },
        { id: 2, value: 42.369309344143447, label: "MPSKT" },
        { id: 3, value: 2.7324912571599008, label: "Sinoviyal Sarkom" },
      ],
      raw_image: "raw_images/02_00.jpg",
      image: "processed_images/02_00_annotated.jpg",
    },
    {
      title: "Result 4",
      date: "15 Oct 2023",
      content: [
        { id: 0, value: 30.916277183605995, label: "Dediferansiye Liposarkom" },
        { id: 1, value: 15.680279634562483, label: "Leiomyosarkom" },
        { id: 2, value: 50.67680842824606, label: "MPSKT" },
        { id: 3, value: 2.7266341290939522, label: "Sinoviyal Sarkom" },
      ],
      raw_image: "raw_images/03_00.jpg",
      image: "processed_images/03_00_annotated.jpg",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ maxWidth: "100vw" }}>
      <CssBaseline />

      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <div style={{ overflowY: "auto", maxHeight: "500px" }}>
            <List>
              {items.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  selected={index === selectedItem}
                  onClick={() => setSelectedItem(index)}
                >
                  <ListItemText primary={item.title} secondary={item.date} />
                  <Grid>
                    <Card>
                      <CardMedia
                        component="img"
                        alt={items[index].title}
                        height="60"
                        image={items[index].image}
                      />
                    </Card>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <h3>Results</h3>
          <RingChart data={items[selectedItem].content} />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Card onClick={openModal}>
            <CardMedia
              component="img"
              alt={items[selectedItem].title}
              height="100%"
              image={
                isAnnotated
                  ? items[selectedItem].image
                  : items[selectedItem].raw_image
              }
            />
          </Card>
          <Switch
            checked={isAnnotated}
            onClick={() => {
              setIsAnnotated(!isAnnotated);
            }}
          />
        </Grid>
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        contentLabel={items[selectedItem].title}
      >
        <div style={modalContentStyle}>
          <img
            src={
              isAnnotated
                ? items[selectedItem].image
                : items[selectedItem].raw_image
            }
            alt={items[selectedItem].title}
            style={modalImageStyle}
          />
          <Button
            onClick={() => {
              closeModal();
            }}
            variant="contained"
          >
            Close
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default ResultScreen;
