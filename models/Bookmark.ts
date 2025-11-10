import mongoose, { Document, Model, models, Schema } from "mongoose";

type BookmarkType = {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  url: string;
  favicon?: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  lastVisited: Date;
  _id: mongoose.Schema.Types.ObjectId;
} & Document;

const bookmarkSchema = new Schema<BookmarkType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    favicon: String,
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    lastVisited: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Bookmark: Model<BookmarkType> =
  models.Bookmark || mongoose.model<BookmarkType>("Bookmark", bookmarkSchema);
