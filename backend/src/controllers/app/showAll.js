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
  if (!user) {
    throw new Error("No user provided");
  }

  if (parent) {
    const parentGroup = await findParentGroup(parent);
    const todos = await findTodosInGroup(parent);
    const groups = await parentGroup.getTodoGroups(orderDescByCreatedAt);
    const parentPath = await getParentPath(parent);
    return { groups, todos, parentPath };
  } else {
    const groups = await findGroupsByUser(user);
    const parentPath = await getParentPath(parent);
    return { groups, parentPath };
  }
}

async function findParentGroup(parentId) {
  const parentGroup = await TodoGroup.findOne({
    where: { id: parentId },
  });

  if (!parentGroup) {
    throw new Error("There is no such parent");
  }

  return parentGroup;
}

async function findTodosInGroup(groupId) {
  return Todo.findAll({
    where: { todoGroupId: groupId },
    order: orderDescByCreatedAt,
  });
}

async function findGroupsByUser(userId) {
  return TodoGroup.findAll({
    where: { userId },
    order: orderDescByCreatedAt,
  });
}

const orderDescByCreatedAt = [["createdAt", "DESC"]];

async function getParentPath(childId, path = []) {
  const child = await TodoGroup.findByPk(childId, { include: TodoGroup });

  if (!child) {
    return path; // Reached the top-level parent or invalid child ID
  }

  console.log(child.toJSON());
  path.unshift(child.id); // Add the current parent to the path

  // Recursively call the function for the parent of the current child
  // return getParentPath(child.todoGroupId, path);
  return getParentPath(child.todoGroupId, path);
}
