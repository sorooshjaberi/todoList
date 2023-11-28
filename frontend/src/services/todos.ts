import { AxiosResponse } from "axios";
import myAxios from "../lib/axiosInstance";
import { ShowResponse, TodoGroups, Todos } from "../models/todos";

export const showGroups = (group?: number) => {
  return myAxios.get<ShowResponse>(
    `/todolist/todoGroups/${group ?? ""}`
  );
};
