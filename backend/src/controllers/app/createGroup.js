import TodoGroup from "../../models/app/todoGroups.js";
import User from "../../models/app/users.js";
import db from "../../models/db.js";

export async function createGroup(req, res) {
  const userId = req.userId;

  const { parent, name } = req.body;
  try {
    let createdTodo;
    const todoGroup = () => TodoGroup.create({ name });
    if (!name) {
      throw new Error("name is empty");
    }
    if (parent) {
      createdTodo = await createNewGroupForGroup(todoGroup, parent);
    } else {
      createdTodo = await createNewGroupForUser(todoGroup, userId);
    }
    res.json({
      id: createdTodo.id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function createNewGroupForUser(todoGroup, userId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user) {
    const todoGroupInstance = await todoGroup();
    await user.addTodoGroup(todoGroupInstance);
    return todoGroupInstance;
  } else {
    throw new Error("user doesn't exist");
  }
}

async function createNewGroupForGroup(todoGroup, parent) {
  const parentGroup = await TodoGroup.findOne({
    where: {
      id: parent,
    },
  });

  if (parentGroup) {
    const todoGroupInstance = await todoGroup();
    await parentGroup.addTodoGroup(todoGroupInstance);
    return todoGroupInstance;
  } else {
    throw new Error("there is no such parent group");
  }
}
