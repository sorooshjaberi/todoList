import { Box, IconButton, TextField, Typography } from "@mui/material";
import useShowGroups from "../../hooks/todos/useShowGroups";
import { memo, useEffect, useRef, useState } from "react";
import SideBarHeader from "./header";
import GroupItem from "./groupItem";
import { Add } from "@mui/icons-material";
import useAddGroup from "../../hooks/todos/useAddGroup";
import { useQueryClient } from "@tanstack/react-query";
import RootAddInput from "./rootAddInput";
type Props = {};
const SideBar = (props: Props) => {
  const { data } = useShowGroups();
  const [input, setInput] = useState<string>();
  const { mutateAsync } = useAddGroup();
  const queryClient = useQueryClient();
  const addGroupHandler = (name: string) => {
    mutateAsync({ name }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["todoGroup"],
      });
    });
  };

  return (
    <Box className="flex h-full flex-col">
      <SideBarHeader />
      <Box className="flex-1">
        <RootAddInput addGroupHandler={addGroupHandler} />
        {data?.groups?.map((group, index) => (
          <Box className=" my-4" key={index}>
            <GroupItem index={index} depth={0} group={group} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default memo(SideBar);
