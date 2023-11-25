import TodoGroup from "../../models/app/todoGroups.js";

export const groupSingleSoftDelete = async (req, res) => {
  const { groupId } = req.params;
  try {
    await handleSingleSoftDelete(groupId);
    res.status(200).json({
      message: `group #${groupId} was deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleSingleSoftDelete = async (groupId) => {
  if (!groupId) throw new Error("no group id proivded");

  const numberOfDestroyed = await TodoGroup.destroy({
    where: {
      id: groupId,
    },
  });

  if (!numberOfDestroyed) {
    throw new Error("todo wasn't found or something went wrong");
  }
};
