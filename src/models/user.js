import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    savedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  {
    collection: "users",
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const userModel = model("User", userSchema);
