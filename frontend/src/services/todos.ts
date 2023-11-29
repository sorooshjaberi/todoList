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
  AddTodoResponse
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

export const addGroup = async (props : AddGroupPayload)=>{
  return myAxios.post<AddGroupResponse>("/todolist/todoGroups/new", props)
}