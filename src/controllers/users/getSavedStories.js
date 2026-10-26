import { userModel } from "../../models/user.js";
import { storyModel } from "../../models/story.js";

export const getSavedStories = async (req, res, next) => {
  try {
    const { page = "1", perPage = "10" } = req.query;

    const currentPage = Number(page);
    const limit = Number(perPage);

    if (
      !Number.isInteger(currentPage) ||
      currentPage < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: "Invalid pagination parameters",
      });
    }

    if (!req.user?._id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const user = await userModel.findById(req.user._id).select("savedStories");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const savedStoryIds = user.savedStories;
    const stories = await storyModel
      .find({ _id: { $in: savedStoryIds } })
      .select("img title category rate date")
      .lean();

    const storiesById = new Map(
      stories.map((story) => [story._id.toString(), story]),
    );

    const orderedStories = savedStoryIds
      .map((id) => storiesById.get(id.toString()))
      .filter(Boolean);

    const totalItems = orderedStories.length;
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (currentPage - 1) * limit;
    const data = orderedStories.slice(skip, skip + limit);

    res.status(200).json({
      data,
      page: currentPage,
      perPage: limit,
      totalItems,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
