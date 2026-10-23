import { getSavedStoriesService } from "../../services/storiesService.js";

export const getSavedStories = async (req, res, next) => {
  try {
    const userId = req.user._id; // Отримуємо ID поточного юзера з мідлвара авторизації
    const { page = 1, limit = 10 } = req.query;

    const result = await getSavedStoriesService({
      userId,
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
