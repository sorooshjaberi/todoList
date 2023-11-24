import { Op, QueryTypes } from "sequelize";
import Todo from "../../models/app/todos.js";
import db from "../../models/db.js";
import TodoGroup from "../../models/app/todo_groups.js";
import User from "../../models/app/users.js";

export const showGroups = async function (req, res) {
  const user = req.userId;
  const {
    params: { parent },
  } = req;

  try {
    const groups = await getGroups(user, parent);
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

async function getGroups(user, parent) {
  let groups;
  if (user) {
    if (parent) {
      groups = await TodoGroup.findAll({
        where: {
          todoGroupId: parent,
        },
      });
    } else {
      groups = await TodoGroup.findAll({
        where: {
          userId: user,
        },
      });
    }
  } else {
    throw new Error("no user provided");
  }
  return groups;
}
export const addATodo = async function (req, res) {
  const { userId, groupData, todoData } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: TodoGroup,
        include: [{ model: Todo }],
      },
    ],
  });

  const [todoGroup, created] = await TodoGroup.findOrCreate({
    where: {
      id: groupData.id,
    },
    defaults: groupData,
  });

  if (created) {
    await user.addTodoGroup(todoGroup);
  }

  const [todo, updated] = await Todo.upsert(todoData, {
    returning: true,
  });

  if (!updated) {
    await todoGroup.addTodo(todo);
  }

  res.status(200);
};
