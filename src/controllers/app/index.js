import Todo from "src/models/app/todos";


export const showAllTodos = async function (req, res) {
  const todos = await Todo.findAll();
  req.json(todos);
};
