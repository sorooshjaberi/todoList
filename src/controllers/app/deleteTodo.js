import Todo from "../../models/app/todos.js";

export const todoSingleSoftDelete = async (req, res) => {
  const { todoId } = req.params;
  try {
    await handleSoftDelete(todoId);
    res.status(200).json({
      message: `todo #${todoId} was deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleSoftDelete = async (todoId) => {
  if (!todoId) throw new Error("no todo id provided");

  const numberOfDestroyed = await Todo.destroy({
    where: {
      id: todoId,
    },
  });

  if (!numberOfDestroyed) {
    throw new Error("todo wasn't found or something went wrong");
  }
};
