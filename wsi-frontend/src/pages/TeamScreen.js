import { Box, Grid } from "@mui/material";
import MemberCard from "../components/MemberCard";

function TeamScreen({ team }) {
  const renderedTeam = team.map((member, index) => {
    return (
      <MemberCard
        name={member.name}
        info={member.info}
        imagePath={member.imagePath}
        index={index % 2}
      />
    );
  });
  return <Grid sx={{ margin: 6, maxWidth: "100hv" }}>{renderedTeam}</Grid>;
}

export default TeamScreen;
