"use server";

import { auth } from "@/lib/auth";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { tagsSchema } from "@/lib/types";
import { Bookmark } from "@/models/Bookmark";
import mongoose from "mongoose";

export async function getTags() {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session?.user?.id);
    const tagsDoc = await Bookmark.aggregate([
      { $match: { userId } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $addFields: { name: "$_id" } },
      { $project: { _id: 0, name: 1, count: 1 } },
      { $sort: { name: 1 } },
    ]);

    const tagsArray = convertToObject(tagsDoc);
    const validTags = tagsSchema.safeParse(tagsArray);
    if (!validTags.success) {
      console.error(validTags.error.issues[0].code);
      return;
    }

    return validTags.data;
  } catch (error) {
    console.error(error);
  }
}
