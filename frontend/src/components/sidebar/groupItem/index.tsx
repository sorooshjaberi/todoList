import { Box, CircularProgress, Typography } from "@mui/material";
import { TodoGroup } from "../../../models/todos";
import useShowGroups from "../../../hooks/todos/useShowGroups";
import { useState } from "react";
import TodoItem from "../todoItem";

type Props = { group: TodoGroup };
const GroupItem = (props: Props) => {
  const { group } = props;
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data: groupChildren, isLoading } = useShowGroups(group.id, enabled);
  return (
    <>
      <Box
        className="flex h-[4rem] cursor-pointer select-none items-center bg-[#5a5a5a38] px-2 py-1 backdrop-blur hover:shadow-meloInner transition-all"
        onClick={() => setEnabled(true)}
        borderLeft={1}
        borderColor={({ palette }) => palette.primary.light}
      >
        <Typography variant="h5">{group.name}</Typography>
      </Box>
      {!isLoading && (
        <Box marginLeft={1}>
          {groupChildren?.groups?.map((group, index) => (
            <GroupItem key={index} group={group} />
          ))}
          {groupChildren?.todos?.map((todo) => <TodoItem todo={todo} />)}
        </Box>
      )}
      {isLoading && (
        <Box className="flex items-center p-2">
          <CircularProgress size={20} />
        </Box>
      )}
    </>
  );
};
export default GroupItem;
