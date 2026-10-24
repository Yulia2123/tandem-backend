import createHttpError from "http-errors";
import { userModel } from "../../models/user.js";
import { uploadAvatarToCloudinary } from "../../services/uploadAvatar.js";

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Avatar image is required");
  }

  const avatarUrl = await uploadAvatarToCloudinary(req.file.buffer);
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { avatarUrl },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json({
    avatarUrl: user.avatarUrl,
  });
};
