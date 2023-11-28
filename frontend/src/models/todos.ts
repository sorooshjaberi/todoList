export type Todo = {
  id: number;
  title: string;
  description?: string;
  done?: boolean;
};

export type Todos = Todo[];

export type TodoGroup = {
  id: number;
  name: string;
};

export type TodoGroups = TodoGroup[];

export type ShowResponse = {
  groups: TodoGroups;
  todos: Todos;
};
