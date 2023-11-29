import { ReactNode, createContext, useContext, useState } from "react";

export const TodoHandlerCtx = createContext<{
  setCurrentTodo(id: number): void;
  currentTodo: number;
}>({
  setCurrentTodo() {},
  currentTodo: -1,
});

export const TodoHandlerProvider = (props: { children: ReactNode }) => {
  const [currentTodo, setCurrentTodo] = useState<number>();
  return (
    <TodoHandlerCtx.Provider value={{ currentTodo, setCurrentTodo }}>
      {props.children}
    </TodoHandlerCtx.Provider>
  );
};

export const useTodoHandler = () => useContext(TodoHandlerCtx);
