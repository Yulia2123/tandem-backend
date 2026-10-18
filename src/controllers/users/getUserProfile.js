
import createHttpError from "http-errors";
import mongoose from "mongoose";

import { userModel } from "../../models/user.js";
import { storyModel } from "../../models/story.js";

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        throw createHttpError(404, "User not found");
    }

    const user = await userModel
        .findById(userId)
        .select("-password -email");

    if (!user) {
        throw createHttpError(404, "User not found");
    }

    const page = Number(req.query.page ?? 1);
    const perPage = Number(req.query.perPage ?? 10);
       const skip = (page - 1) * perPage;

    const filter = { ownerId: userId };

    const [totalItems, stories] = await Promise.all([
    storyModel.countDocuments(filter),
    storyModel
        .find(filter)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(perPage)
        .populate("category", "category"),
    ]);

    res.status(200).json({
        user,
        page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        stories,
    });
};
