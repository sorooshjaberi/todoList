import { AxiosResponse } from "axios";
import myAxios from "../lib/axiosInstance";
import {
  AddTodoPayload,
  ShowGroupResponse,
  ShowTodoResponse,
  Todo,
  TodoGroups,
  Todos,
  AddGroupPayload,
  AddGroupResponse,
  AddTodoResponse,
  EditTodoPayload,
  EditTodoResponse,
  DeleteGroupResponse,
  DeleteTodoResponse,
  CreateSchedulePayload,
  CreateScheduleResponse,
} from "../models/todos";

export const showGroups = (group?: number) => {
  return myAxios.get<ShowGroupResponse>(`/todolist/todoGroups/${group ?? ""}`);
};

export const showTodo = async (todo: number) => {
  return myAxios.get<ShowTodoResponse>(`/todolist/todos/${todo}`);
};

export const addTodo = async (props: AddTodoPayload) => {
  return myAxios.post<AddTodoResponse>("/todolist/todos/new", props);
};

export const addGroup = async (props: AddGroupPayload) => {
  return myAxios.post<AddGroupResponse>("/todolist/todoGroups/new", props);
};

export const editTodo = async (props: {
  todoData: EditTodoPayload;
  todoNumber: number;
}) => {
  return myAxios.put<EditTodoResponse>(
    `/todolist/todos/${props.todoNumber}/edit`,
    { todoData: props.todoData },
  );
};

export const deleteGroup = async (groupId: number) => {
  return myAxios.delete<DeleteGroupResponse>(
    `/todolist/todoGroups/${groupId}/delete`,
  );
};

export const deleteTodo = async (todoId: number) => {
  return myAxios.delete<DeleteTodoResponse>(`/todolist/todos/${todoId}/delete`);
};

export const createSchedule = async (props: CreateSchedulePayload) => {
  return myAxios.post<CreateScheduleResponse>(
    `/todolist/schedules/create`,
    props,
  );
};
