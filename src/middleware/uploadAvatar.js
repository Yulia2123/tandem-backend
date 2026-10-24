import createHttpError from "http-errors";
import multer from "multer";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        createHttpError(400, "Avatar must be a JPG, PNG, WEBP, or GIF image"),
      );
      return;
    }

    callback(null, true);
  },
});

export const uploadAvatar = upload.single("avatar");
