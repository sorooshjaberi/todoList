import Todo from "../../models/app/todos.js";

export const editTodo = async (req, res) => {
  const { todoData } = req.body;
  const { todoId } = req.params;
  try {
    const newTodo = await editTodoHandler(todoId, todoData);
    res.json({
      todo: newTodo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

async function editTodoHandler(todoId, todoData) {
  if (!todoId) {
    throw new Error("no todo id provied");
  }
  const todo = () => Todo.findByPk(todoId);
  if (await todo()) {
    await Todo.update(todoData, {
      where: {
        id: todoId,
      },
    });
    return todo();
  } else {
    throw new Error("no such todo");
  }
}
