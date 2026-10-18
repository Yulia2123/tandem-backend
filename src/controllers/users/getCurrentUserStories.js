import { storyModel } from "../../models/story.js";

export const getCurrentUserStories = async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const perPage = Number(req.query.perPage ?? 10);

  const filter = {
    ownerId: req.user._id,
  };

  const skip = (page - 1) * perPage;

  const [totalItems, stories] = await Promise.all([
    storyModel.countDocuments(filter),
    storyModel.find(filter).sort({ _id: -1 }).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    stories,
  });
};
