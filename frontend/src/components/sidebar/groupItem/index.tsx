import { Box, CircularProgress, Typography } from "@mui/material";
import { TodoGroup } from "../../../models/todos";
import useShowGroups from "../../../hooks/todos/useShowGroups";
import { useState } from "react";
import TodoItem from "../todoItem";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";

type Props = { group: TodoGroup; depth: number; index: number };
const GroupItem = (props: Props) => {
  const { group, depth, index } = props;
  const [enabled, setEnabled] = useState<boolean>(false);
  const { data: groupChildren, isLoading } = useShowGroups(group.id, enabled);
  return (
    <>
      <TranslateL2RSmall
        motionProps={{
          transition: {
            delay: index * 0.3,
            type: "spring",
            stiffness: 1000,
          },
        }}
      >
        <Box
          className="bg-glassNormal hover:bg-glassLight flex h-[4rem] cursor-pointer select-none items-center px-2 py-1 transition-all duration-300"
          onClick={() => setEnabled(true)}
          borderLeft={1}
          borderColor={({ palette }) => palette.primary.light}
        >
          <Typography variant="h5">{group.name}</Typography>
        </Box>
      </TranslateL2RSmall>
      {!isLoading && (
        <Box marginLeft={1}>
          {groupChildren?.groups?.map((group, index) => (
            <GroupItem index={index} depth={depth} key={index} group={group} />
          ))}
          {groupChildren?.todos?.map((todo, index) => (
            <TodoItem index={index} depth={depth} key={index} todo={todo} />
          ))}
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
