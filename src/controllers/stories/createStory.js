import createHttpError from "http-errors";
import { storyModel } from "../../models/story.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createStory = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, "Story image is required");
    }

    const ownerId = req.user._id;

    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    const newStory = await storyModel.create({
      ...req.body,
      img: uploadedImage.secure_url,
      ownerId,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: newStory,
    });
  } catch (error) {
    next(error);
  }
};
