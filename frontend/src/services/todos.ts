import myAxios from "../lib/axiosInstance";

export const showGroups = (group?: number) => {
  return myAxios.get(`/todolist/todoGroups/${group ?? ""}`);
};
