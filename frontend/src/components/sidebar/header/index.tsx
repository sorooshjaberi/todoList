import { Box, Typography } from "@mui/material";

type Props = {};
const SideBarHeader = (props: Props) => {
  return (
    <Box className="mb-4">
      <Typography
        className="text-center select-none"
        variant="h3"
        color={"primary"}
        component={"h2"}
        sx={{
          textShadow: "0px 0px 4px",
        }}
      >
        Todos
      </Typography>
    </Box>
  );
};
export default SideBarHeader;
