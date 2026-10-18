import { Schema, model } from "mongoose";

const storySchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    collection: "stories",
    versionKey: false,
  },
);

storySchema.index({ category: 1, rate: -1, date: -1 });

export const storyModel = model("Story", storySchema);
