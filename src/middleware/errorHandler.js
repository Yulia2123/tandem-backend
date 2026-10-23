import { HttpError } from "http-errors";
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image size must not exceed 5 MB"
        : err.code === "LIMIT_FILE_COUNT"
        ? "Only one image is allowed"
        : "Error uploading image";

    return res.status(400).json({ message });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      message: "Please upload an image file",
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  return res.status(500).json({
    message: isProd ? "Internal server error" : err.message,
  });
};
