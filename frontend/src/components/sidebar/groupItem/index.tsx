import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonBase,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
  lighten,
} from "@mui/material";
import { ShowGroupResponse, Todo, TodoGroup } from "../../../models/todos";
import useShowGroups from "../../../hooks/todos/useShowGroups";
import { MouseEvent, memo, useState } from "react";
import TodoItem from "../todoItem";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";
import { Add, CreateNewFolder, Folder } from "@mui/icons-material";
import { useTodoHandler } from "../../../providers/TodoHandler";
import useAddTodo from "../../../hooks/todos/useAddTodo";
import { useQueryClient } from "@tanstack/react-query";
import useAddGroup from "../../../hooks/todos/useAddGroup";
import GroupSingleBox from "./GroupSingleBox";
import AddInput from "../AddInput";

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
  const { setCurrentPath, currentPath } = useTodoHandler();
  // const [fetchEnabled, setEnabled] = useState<boolean>();
  const enabled = currentPath.includes(group.id);
  const isItemTemp = group.id === 0;
  const latestPathItem = currentPath[currentPath.length - 1];
  const parentGroup = group.todoGroupId;

  const {
    data: groupChildren,
    isLoading,
    isSuccess,
  } = useShowGroups(group.id, enabled);

  const { mutateAsync, isPending } = useAddGroup();

  const tempGroups = [...(groupChildren?.groups || [])];

  if (tempNewFolder) {
    tempGroups.unshift(tempNewFolder);
  }

  const tempTodos = [...(groupChildren?.todos || [])];

  if (tempNewTodo) {
    tempTodos.unshift(tempNewTodo as Todo);
  }

  const queryClient = useQueryClient();

  const addGroupHandler = (name: string) => {
    mutateAsync({ name, parent: currentPath[currentPath.length - 1] }).then(
      () => {
        clearTempGroup?.();
        queryClient.invalidateQueries({
          queryKey: ["todoGroup", currentPath[currentPath.length - 1]],
        });
      },
    );
  };

  const setPathHandler = (e: MouseEvent) => {
    e.stopPropagation();
    if (enabled) {
      setCurrentPath((prev) => prev.filter((item) => item !== group.id));
    } else {
      setCurrentPath((prev) => [...prev, group.id]);
    }
  };

  const addGroupToPath = () => {
    if (currentPath.findIndex((item) => item === group.id) === -1) {
      setCurrentPath((prev) => [...prev, group.id]);
    }
  };

  return (
    <>
      <Accordion
        expanded={enabled}
        onClick={setPathHandler}
        onChange={(e) => {
          isItemTemp && e.stopPropagation();
        }}
      >
        <AccordionSummary>
          <Box
            className="flex h-[4rem] w-full cursor-pointer select-none items-center justify-between gap-2 bg-glassNormal px-2 py-1 transition-all duration-300 hover:shadow-meloInner"
            bgcolor={({ palette }) =>
              enabled ? lighten(palette.primary.light, depth * 0.1) : undefined
            }
          >
            {!isItemTemp && (
              <GroupSingleBox
                {...{
                  group,
                  setTempNewFolder,
                  setTempNewTodo,
                  addGroupToPath,
                }}
              />
            )}
            {isItemTemp && (
              <AddInput
                {...{
                  addGroupHandler,
                  isPending,
                }}
              />
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          {isSuccess && (
            <Box className="max-h-[80%] overflow-y-auto">
              {tempTodos.map((todo, index) => (
                <Box
                  className="my-3 px-[1rem]"
                  onClick={(e) => e.stopPropagation()}
                  key={index}
                >
                  <TodoItem
                    clearTemp={() => setTempNewTodo(undefined)}
                    index={index}
                    depth={depth}
                    todo={todo}
                  />
                </Box>
              ))}
              {tempGroups.map((group, index) => (
                <GroupItem
                  clearTempGroup={() => setTempNewFolder(undefined)}
                  index={index}
                  depth={depth + 1}
                  key={index}
                  group={group}
                />
              ))}
            </Box>
          )}
          {isLoading && (
            <Box className="flex items-center p-2">
              <CircularProgress size={20} />
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      <Box className="block w-full px-[1rem]"></Box>
    </>
  );
};
export default memo(GroupItem);
