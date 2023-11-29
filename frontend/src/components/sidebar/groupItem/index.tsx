import {
  Box,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Todo, TodoGroup } from "../../../models/todos";
import useShowGroups from "../../../hooks/todos/useShowGroups";
import { memo, useState } from "react";
import TodoItem from "../todoItem";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";
import { Add, CreateNewFolder, Folder } from "@mui/icons-material";
import { useTodoHandler } from "../../../providers/TodoHandler";
import useAddTodo from "../../../hooks/todos/useAddTodo";
import { useQueryClient } from "@tanstack/react-query";
import useAddGroup from "../../../hooks/todos/useAddGroup";

type Props = {
  group: TodoGroup;
  depth: number;
  index: number;
  enabled?: boolean;
  clearTempGroup?(): void;
};
const GroupItem = (props: Props) => {
  const { group, depth, index, clearTempGroup } = props;
  const [tempNewFolder, setTempNewFolder] = useState<TodoGroup>();
  const [tempNewTodo, setTempNewTodo] = useState<Partial<Todo>>();
  const { setCurrentFolder, currentFolder } = useTodoHandler();
  const enabled = currentFolder === group.id;
  const {
    data: groupChildren,
    isLoading,
    isSuccess,
  } = useShowGroups(group.id, enabled);

  const { mutateAsync, isPending } = useAddGroup();

  const tempGroups = [...(groupChildren?.groups || [])];
  console.log({ tempNewFolder });
  if (tempNewFolder) {
    tempGroups.unshift(tempNewFolder);
  }

  const tempTodos = [...(groupChildren?.todos || [])];

  if (tempNewTodo) {
    tempTodos.unshift(tempNewTodo as Todo);
  }

  const queryClient = useQueryClient();

  const addGroupHandler = (name: string) => {
    mutateAsync({ name, parent: currentFolder }).then(() => {
      clearTempGroup?.();
      queryClient.invalidateQueries({
        queryKey: ["todoGroup", currentFolder],
      });
    });
  };

  return (
    <>
      <motion.div
      // variants={motionVariants}
      // initial="left10"
      // animate="swipFromLeft10"
      >
        <Box
          className="flex h-[4rem] cursor-pointer select-none items-center justify-between gap-2 bg-glassNormal px-2 py-1 transition-all duration-300 hover:shadow-meloInner"
          onClick={() => group.id && setCurrentFolder(group.id)}
          borderLeft={1}
          borderColor={({ palette }) => palette.primary.light}
          bgcolor={({ palette }) =>
            enabled ? palette.primary.light : undefined
          }
        >
          {group.id !== 0 && (
            <Typography variant="h6" className="mr-auto">
              {group.name}
            </Typography>
          )}
          {group.id === 0 && (
            <Input
              autoFocus
              fullWidth
              disabled={isPending}
              onBlur={(event) =>
                event?.target?.value && addGroupHandler(event?.target?.value)
              }
              onKeyUp={(event) =>
                event.key === "Enter" &&
                event?.currentTarget?.value &&
                addGroupHandler(event?.currentTarget?.value)
              }
              endAdornment={
                isPending && (
                  <InputAdornment position="end">
                    <CircularProgress size={10} className="mx-2" />
                  </InputAdornment>
                )
              }
            />
          )}
          {group.id !== 0 && (
            <Box className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <CreateNewFolder
                onClick={(e) => setTempNewFolder({ id: 0, name: "" })}
                className="hover:text-gray-400"
              />
              <Add
                onClick={(e) => setTempNewTodo({ id: 0, title: "" })}
                className="hover:text-gray-400"
              />
            </Box>
          )}
        </Box>
      </motion.div>

      {isSuccess && (
        <Box marginLeft={1} className="max-h-[400px] overflow-y-auto">
          {tempGroups.map((group, index) => (
            <GroupItem
              clearTempGroup={() => setTempNewFolder(undefined)}
              index={index}
              depth={depth}
              key={index}
              group={group}
            />
          ))}
          {tempTodos.map((todo, index) => (
            <TodoItem
              clearTemp={() => setTempNewTodo(undefined)}
              index={index}
              depth={depth}
              key={index}
              todo={todo}
            />
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
export default memo(GroupItem);
