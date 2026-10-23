
import { userModel } from "../../models/user.js";

export const getTravellers = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const perPage = Math.min(
    100,
    Math.max(1, Number(req.query.perPage) || 12)
  );

  const skip = (page - 1) * perPage;

  const [totalItems, users] = await Promise.all([
    userModel.countDocuments(),
    userModel.aggregate([
      {
        $addFields: {
          hasAvatar: {
            $cond: [
              {
                $and: [
                  { $ne: [{ $ifNull: ["$avatarUrl", ""] }, ""] },
                  { $ne: ["$avatarUrl", null] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
      { $sort: { hasAvatar: -1, _id: -1 } },
      { $skip: skip },
      { $limit: perPage },
      {
        $project: {
          password: 0,
          email: 0,
          hasAvatar: 0,
        },
      },
    ]),
  ]);

  res.status(200).json({
    users,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
  });
};
