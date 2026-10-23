import { userModel } from "../models/user.js";
import { storyModel } from "../models/story.js";

export const getSavedStoriesService = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;

  // 1. Знаходимо користувача та беремо його масив savedArticles
  const user = await userModel.findById(userId);
  if (!user || !user.savedArticles || user.savedArticles.length === 0) {
    return {
      stories: [],
      total: 0,
      page: Number(page),
      limit: Number(limit),
      totalPages: 0,
    };
  }

  const savedIds = user.savedArticles;
  const total = savedIds.length;

  // 2. Знаходимо самі статті за масивом їх ID з урахуванням пагінації
  const stories = await storyModel
    .find({ _id: { $in: savedIds } })
    .skip(skip)
    .limit(Number(limit));

  return {
    stories,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
};
