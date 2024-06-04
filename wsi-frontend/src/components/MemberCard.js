import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

function MemberCard({ name, info, imagePath, index }) {
  const alignRight = index === 1;
  const CardMediaC = (
    <CardMedia
      component="img"
      image={imagePath}
      sx={{
        width: 150,
        borderRadius: 9999,
        marginLeft: alignRight ? "auto" : 0,
        marginRight: alignRight ? 0 : "auto",
      }}
    />
  );

  return (
    <Card
      sx={{
        padding: 3,
        display: "flex",
        mb: 3,
        maxWidth: "50%",
        backgroundColor: "#e6e9ef",
        marginLeft: alignRight ? "auto" : 0,
        marginRight: alignRight ? 0 : "auto",
      }}
    >
      {index === 0 && CardMediaC}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography component="div" variant="body1">
            {info}
          </Typography>
        </CardContent>
      </Box>

      {index === 1 && CardMediaC}
    </Card>
  );
}

export default MemberCard;
