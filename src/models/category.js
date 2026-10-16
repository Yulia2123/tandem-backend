import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
    versionKey: false,
  }
);

export const categoryModel = model("Category", categorySchema);
