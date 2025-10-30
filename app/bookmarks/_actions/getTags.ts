"use server";

import { auth } from "@/lib/auth";
import { convertToObject } from "@/lib/convertToObject";
import connectDB from "@/lib/database";
import { tagsSchema } from "@/lib/types";
import { Bookmark } from "@/models/Bookmark";

export async function getTags() {
  try {
    await connectDB();
    const session = await auth();

    const tagsDoc = await Bookmark.find({
      userId: session?.user?.id,
    }).select("tags");

    const tagsArrayDoc = tagsDoc
      .map((tag) => tag.tags)
      .flat()
      .sort();
    const tagsArray = convertToObject(tagsArrayDoc);

    const validTags = tagsSchema.safeParse(tagsArray);
    if (!validTags.success) {
      console.error(validTags.error.issues[0].code);
      return;
    }
    const tagsObject = validTags.data.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const formattedTagsArray = Object.keys(tagsObject).map((key, i) => {
      return { [key]: Object.values(tagsObject)[i] };
    });
    return formattedTagsArray;
  } catch (error) {
    console.error(error);
  }
}
