import { Box, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";
import { memo, useEffect } from "react";
import SideBarHeader from "./header";
import GroupItem from "./groupItem";
type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();

  return (
    <Box className="flex h-full flex-col">
      <SideBarHeader />
      <Box className="flex-1">
        {data?.groups?.map((group, index) => (
          <Box className=" my-4">
            <GroupItem index={index} depth={0} key={index} group={group} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default memo(SideBar);
