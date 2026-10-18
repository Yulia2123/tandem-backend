import { userModel } from "../../models/user.js";


export const getSavedStories = async (req, res) => {
 const page = Number(req.query.page ?? 1);
const perPage = Number(req.query.perPage ?? 10);

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(perPage) ||
    page < 1 ||
    perPage < 1
  ) {
    return res.status(400).json({
      message: "Page and perPage must be positive integers",
    });
  }

  const skip = (page - 1) * perPage;

  res.json({ page, perPage });
};