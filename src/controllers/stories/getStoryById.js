import createHttpError from "http-errors";
import mongoose from "mongoose";
import { storyModel } from "../../models/story.js";

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  if (!mongoose.isValidObjectId(storyId)) {
    throw createHttpError(404, "Story not found");
  }

  const story = await storyModel.findOne({ _id: storyId });

  console.log(story);

  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  res.status(200).json({ story });
};
