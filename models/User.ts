import mongoose, { Document, Model, models, Schema } from "mongoose";

type UserType = {
  email: string;
  password?: string;
  fullName: string;
  provider?: "google" | "local";
  _id: mongoose.Schema.Types.ObjectId;
} & Document;

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        if (this.provider === "local") return true;
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "local"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<UserType> =
  models.User || mongoose.model<UserType>("User", UserSchema);
