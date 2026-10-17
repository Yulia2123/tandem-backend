import { storyModel } from "../../models/story";

export const getAllStories = async (req, res) => {
  const { perPage = 10, page = 1, category, popular = "asc" } = req.query;
  const skip = (page - 1) * perPage;
  const storiesQuery = storyModel.find();
  if (category) {
    storiesQuery.where("category").equal(category);
  }
  [totalStories, stories] = Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery
      .skip(skip)
      .limit(perPage)
      .sort({ ["rate"]: popular }),
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
