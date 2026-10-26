import createHttpError from "http-errors";
import { userModel } from "../../models/user.js";

export const removeSavedStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    if (!req.user?._id) {
      throw createHttpError(401, "Authentication required");
    }

    if (!/^[0-9a-fA-F]{24}$/.test(storyId)) {
      throw createHttpError(400, "Invalid story ID");
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const savedIds = user.savedStories ?? [];

    const isSaved = savedIds.some(
      (id) => id.toString() === storyId
    );

    if (!isSaved) {
      throw createHttpError(404, "Story is not saved");
    }

    user.savedStories = savedIds.filter(
      (id) => id.toString() !== storyId
    );

    await user.save();

    res.status(200).json({
      message: "Story removed from saved stories",
    });
  } catch (error) {
    next(error);
  }
};
