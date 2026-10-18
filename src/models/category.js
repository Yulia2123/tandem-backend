import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
    versionKey: false,
  }
);

export const categoryModel = model("Category", categorySchema);
