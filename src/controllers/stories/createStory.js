import { storyModel } from "../../models/story.js";

export const createStory = async (req, res, next) => {
  try {
    // Отримуємо ID поточного користувача з об'єкта запиту (який заповнює авторизація)
    const ownerId = req.user._id;

    // Створюємо нову історію, додаючи до даних із тіла запиту ownerId
    const newStory = await storyModel.create({
      ...req.body,
      ownerId,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: newStory,
    });
  } catch (error) {
    next(error);
  }
};
