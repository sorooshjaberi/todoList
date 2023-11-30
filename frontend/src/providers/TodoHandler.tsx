import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const TodoHandlerCtx = createContext<{
  setCurrentTodo: Dispatch<SetStateAction<number>>;
  setCurrentPath: Dispatch<SetStateAction<number[]>>;
  currentTodo: number;
  currentPath: number[];
}>({
  setCurrentTodo() {},
  setCurrentPath() {},
  currentTodo: -1,
  currentPath: [],
});

export const TodoHandlerProvider = (props: { children: ReactNode }) => {
  const [currentTodo, setCurrentTodo] = useState<number>();
  const [currentPath, setCurrentPath] = useState<number[]>([]);

  return (
    <TodoHandlerCtx.Provider
      value={{ currentTodo, setCurrentTodo, currentPath, setCurrentPath }}
    >
      {props.children}
    </TodoHandlerCtx.Provider>
  );
};

export const useTodoHandler = () => useContext(TodoHandlerCtx);
