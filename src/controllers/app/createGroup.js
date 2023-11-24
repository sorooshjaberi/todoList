import TodoGroup from "../../models/app/todo_groups.js";
import User from "../../models/app/users.js";

export async function createGroup(req, res) {
  const userId = req.userId;

  const { parent, name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("name is empty");
  }
  const todoGroup = TodoGroup.create({ name });
  try {
    if (parent) {
      await createNewGroupForGroup(todoGroup, parent);
    } else {
      await createNewGroupForUser(todoGroup, userId);
    }
    res.json({
      id: todoGroup.id,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function createNewGroupForUser(todoGroup, userId) {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user) {
    await user.addTodoGroup(todoGroup);
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
    await parentGroup.addTodoGroup(todoGroup);
  } else {
    res.status(400);
    throw new Error("there is no such parent group");
  }
}
