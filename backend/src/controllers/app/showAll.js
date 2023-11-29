import { Op, QueryTypes, fn } from "sequelize";
import Todo from "../../models/app/todos.js";
import db from "../../models/db.js";
import TodoGroup from "../../models/app/todoGroups.js";
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
  let children;
  if (user) {
    if (parent) {
      const parentGroup = await TodoGroup.findOne({
        where: {
          id: parent,
        },
      });
      if (!parentGroup) {
        throw new Error("there is no such parent");
      }
      const todos = await Todo.findAll({
        where: {
          todoGroupId: parent,
        },
        order: [["createdAt", "DESC"]],
      });
      children = {
        groups: await parentGroup.getTodoGroups({
          order: [["createdAt", "DESC"]],
        }),
        todos,
      };
    } else {
      children = {
        groups: await TodoGroup.findAll({
          where: {
            userId: user,
          },
          order: [["createdAt", "DESC"]],
        }),
      };
    }
  } else {
    throw new Error("no user provided");
  }
  return children;
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
