import { Box, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";

type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();
  console.log({ data });
  return (
    <Box>
      <Typography
        className="text-center"
        variant="h4"
        color={"primary"}
        component={"h2"}
        
      >
        Todos
      </Typography>
    </Box>
  );
};
export default SideBar;
