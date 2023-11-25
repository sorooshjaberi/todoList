import TodoGroup from "../../models/app/todoGroups.js";

export const createTodo = async (req, res) => {
  const { parent, todoTitle } = req.body;
  try {
    const todo = await createTodoHandler(parent, todoTitle);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
async function createTodoHandler(parent, todoTitle) {
  if (parent) {
    const parentInstance = await TodoGroup.findOne({
      where: {
        id: parent,
      },
    });

    if (!parentInstance) {
      throw new Error("there is no such parent");
    }

    return await parentInstance.createTodo({
      title: todoTitle,
    });
  } else {
    throw new Error("no parent is provided");
  }
}

//first create an empty todo with only name and return the id

//then use edit endpoint for more data
