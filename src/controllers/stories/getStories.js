import { storyModel } from "../../models/story.js";

export const getAllStories = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const perPage = Math.max(1, Number(req.query.perPage) || 10);
    const { category, ownerId } = req.query;
    const popular = req.query.popular === "desc" ? "desc" : "asc";

    const storiesQuery = {};

    if (category) {
      storiesQuery.category = category;
    }

    if (ownerId) {
      storiesQuery.ownerId = ownerId;
    }

    const [totalItems, stories] = await Promise.all([
      storyModel.countDocuments(storiesQuery),
      storyModel
        .find(storiesQuery)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ rate: popular }),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page,
      perPage,
      totalItems,
      totalPages,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stories",
    });
  }
};
