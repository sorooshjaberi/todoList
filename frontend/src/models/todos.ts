export type Todo = {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  todoGroupId: number | null;
};

export type Todos = Todo[];

export type TodoGroup = {
  id: number;
  name: string;
};

export type TodoGroups = TodoGroup[];

export type ShowGroupResponse = {
  groups: TodoGroups;
  todos: Todos;
};

export type ShowTodoResponse = {
  todo: Todo;
};

export type AddTodoPayload = { todoTitle: string; parent: number };

export type AddTodoResponse = Todo;

export type AddGroupPayload = { name: string; parent?: number };

export type AddGroupResponse = {id : number}

