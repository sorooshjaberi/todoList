import { ReactNode, createContext, useContext, useState } from "react";

export const TodoHandlerCtx = createContext<{
  setCurrentTodo(id: number): void;
  setCurrentFolder(id: number): void;
  currentTodo: number;
  currentFolder: number;
}>({
  setCurrentTodo() {},
  setCurrentFolder() {},
  currentTodo: -1,
  currentFolder: -1,
});

export const TodoHandlerProvider = (props: { children: ReactNode }) => {
  const [currentTodo, setCurrentTodo] = useState<number>();
  const [currentFolder, setCurrentFolder] = useState<number>();
  return (
    <TodoHandlerCtx.Provider
      value={{ currentTodo, setCurrentTodo, currentFolder, setCurrentFolder }}
    >
      {props.children}
    </TodoHandlerCtx.Provider>
  );
};

export const useTodoHandler = () => useContext(TodoHandlerCtx);
