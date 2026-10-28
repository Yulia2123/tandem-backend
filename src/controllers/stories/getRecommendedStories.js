import createHttpError from "http-errors";
import mongoose from "mongoose";
import { storyModel } from "../../models/story.js";

export const getRecommendedStories = async (req, res) => {
  const { storyId } = req.params;
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  if (!mongoose.isValidObjectId(storyId)) {
    throw createHttpError(404, "Story not found");
  }

  const currentStory = await storyModel.findOne({ _id: storyId });

  if (!currentStory) {
    throw createHttpError(404, "Story not found");
  }

  const filter = {
    category: currentStory.category,
    _id: { $ne: storyId },
  };

  const sortOptions = {
    rate: "desc",
    date: "desc",
  };

  const [totalStories, stories] = await Promise.all([
    storyModel.countDocuments(filter),
    storyModel.find(filter).skip(skip).limit(perPage).sort(sortOptions).populate('ownerId', 'name'),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalStories,
    totalPages,
    stories,
  });
};
