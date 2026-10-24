import { cloudinary } from "../config/cloudinary.js";
import createHttpError from "http-errors";

const ensureCloudinaryConfiguration = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw createHttpError(500, "Cloudinary configuration is missing");
  }

};

export const uploadAvatarToCloudinary = (buffer) => {
  ensureCloudinaryConfiguration();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_AVATARS_FOLDER ?? "tandem/avatars",
        resource_type: "image",
        transformation: [
          {
            width: 400,
            height: 400,
            crop: "fill",
            gravity: "face",
            fetch_format: "auto",
            quality: "auto",
          },
        ],
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(createHttpError(502, "Unable to upload avatar"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
};
