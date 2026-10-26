import createHttpError from "http-errors";
import { userModel } from "../../models/user.js";
import { storyModel } from "../../models/story.js";

export const saveStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    if (!req.user?._id) {
      throw createHttpError(401, "Authentication required");
    }

    if (!storyId.match(/^[0-9a-fA-F]{24}$/)) {
      throw createHttpError(400, "Invalid story ID");
    }

    const story = await storyModel.findById(storyId);

    if (!story) {
      throw createHttpError(404, "Story not found");
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const savedIds = user.savedStories ?? [];

    const alreadySaved = savedIds.some(
      (id) => id.toString() === storyId,
    );

    if (alreadySaved) {
      return res.status(200).json({
        message: "Story is already saved",
      });
    }

    user.savedStories = savedIds;
    user.savedStories.push(story._id);

    await user.save();

    return res.status(200).json({
      message: "Story saved successfully",
    });
  } catch (error) {
    next(error);
  }
};