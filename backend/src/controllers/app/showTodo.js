import Todo from "../../models/app/todos.js";

export const showTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    if (!todoId) throw new Error("no todo id provided");
    const todo = await Todo.findByPk(todoId);
    if (!todo) throw new Error("there's no such todo");
    res.status(200).json({
      todo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
