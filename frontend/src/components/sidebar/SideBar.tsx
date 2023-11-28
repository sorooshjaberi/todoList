import { Box, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";
import { memo } from "react";
import SideBarHeader from "./header";
import GroupItem from "./groupItem";

type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();
  return (
    <Box
      className="h-full"
      borderRight={1}
      borderColor={({ palette }) => palette.primary.light}
    >
      <SideBarHeader />
      {data?.groups?.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </Box>
  );
};
export default memo(SideBar);
