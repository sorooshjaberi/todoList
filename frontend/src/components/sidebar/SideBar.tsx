import { Box, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";
import { memo, useEffect } from "react";
import SideBarHeader from "./header";
import GroupItem from "./groupItem";
import { useTodoHandler } from "../../providers/TodoHandler";

type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();

  const { setCurrentPath } = useTodoHandler();

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
