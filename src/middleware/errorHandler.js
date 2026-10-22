import { HttpError } from "http-errors";
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const isTooLarge = err.code === "LIMIT_FILE_SIZE";

    return res.status(isTooLarge ? 413 : 400).json({
      message: isTooLarge
        ? "Avatar image must not exceed 5 MB"
        : "Invalid avatar upload",
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Oops, it's an error :)" : err.message,
  });
};
