"use server";

import data from "@/data.json";
import connectDB from "@/lib/database";
import { Bookmark } from "@/models/Bookmark";
import mongoose from "mongoose";

export async function createInitialData(
  userId: mongoose.Schema.Types.ObjectId
) {
  try {
    await connectDB();
    data.bookmarks.forEach(async (bookmark) => {
      await Bookmark.create({
        userId,
        title: bookmark.title,
        url: bookmark.url,
        favicon: bookmark.favicon,
        description: bookmark.description,
        tags: bookmark.tags,
        pinned: bookmark.pinned,
        isArchived: bookmark.isArchived,
        visitCount: bookmark.visitCount,
        lastVisited: bookmark.lastVisited,
      });
    });
  } catch (error) {
    console.error(error);
  }
}
