import TodoGroup from "../../models/app/todoGroups.js";
import User from "../../models/app/users.js";

export const editTodoGroupParent = async (req, res) => {
  const { groupIds, parentId } = req.body;
  const { userId } = req;
  try {
    await editParentHandler({
      groupIds,
      parentId,
      userId,
    });
    res.status(200).json({
        message : "group changed successfully"
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editParentHandler = async ({ groupIds, parentId, userId }) => {
  const promises = groupIds.map(async (groupId) => {
    checkUnit(groupId, "group id");

    const group = await TodoGroup.findByPk(groupId);

    if (!group) {
      throw new Error("there is no such group");
    }

    /**
     * remove from parent or root level
     */
    const prevGroupParent = group.todoGroupId;
    if (!prevGroupParent) {
      checkUnit(userId, "user id");
      const user = await User.findByPk(userId);
      checkUnit(user, "user", true);
      await user.removeTodoGroup(group);
    } else {
      const prevParent = await TodoGroup.findByPk(prevGroupParent);
      checkUnit(prevParent, "parent group", true);
      prevParent.removeTodoGroup(group);
    }

    /**
     * add goup to a parent or user
     */
    if (parentId) {
      const parent = await TodoGroup.findByPk(parentId);
      checkUnit(parent, "parent group", true);
      await parent.addTodoGroup(group);
    } else {
      checkUnit(userId, "user id");
      const user = await User.findByPk(userId);
      checkUnit(user, "user", true);
      await user.addTodoGroup(group);
    }
  });
  await Promise.all(promises);
};

const checkUnit = (value, unit, notFound) => {
  if (value !== undefined) {
    return true;
  }
  if (notFound) {
    throw new Error(`${unit} not found`);
  }
  throw new Error(`no ${unit} provided`);
};
