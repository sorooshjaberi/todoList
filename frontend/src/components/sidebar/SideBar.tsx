import { Box, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";
import { memo, useEffect } from "react";
import SideBarHeader from "./header";
import GroupItem from "./groupItem";
import { useTodoHandler } from "../../providers/TodoHandler";

type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();

  const { setCurrentFolder } = useTodoHandler();

  useEffect(() => {
    if (data?.groups?.length) {
      setCurrentFolder(data.groups[0].id);
    }
  }, [data, setCurrentFolder]);

  return (
    <Box
      className="h-full flex flex-col"
      borderRight={1}
      borderColor={({ palette }) => palette.primary.light}
    >
      <SideBarHeader />
      <Box className="flex-1 overflow-y-auto">
        {data?.groups?.map((group, index) => (
          <GroupItem index={index} depth={0} key={index} group={group} />
        ))}
      </Box>
    </Box>
  );
};
export default memo(SideBar);
