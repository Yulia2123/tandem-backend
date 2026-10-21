// export const getCategories = (req, res) => {
//   res.json("Get categories OK");
// };

import { categoryModel } from "../../models/category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};
