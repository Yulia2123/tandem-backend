
import { userModel } from "../../models/user.js";
import { storyModel } from "../../models/story.js";

export const getSavedStories = async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const perPage = Number(req.query.perPage ?? 10);

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(perPage) ||
    page < 1 ||
    perPage < 1
  ) {
    return res.status(400).json({
      message: "Page and perPage must be positive integers",
    });
  }

  const userId = req.user._id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const savedStoryIds = user.savedArticles ?? [];

  const filter = {
    _id: { $in: savedStoryIds },
  };

  const totalItems = await storyModel.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);
  const skip = (page - 1) * perPage;

  const savedStories = await storyModel
    .find(filter)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(perPage)
    .lean();

  return res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    stories: savedStories,
  });
};
