"use client";

import { BookmarkType } from "@/lib/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  GlobeIcon,
  PinIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import BookmarkActions from "./BookmarkActions";
import { months } from "@/lib/consts";

type Props = {
  bookmark: BookmarkType;
};
function BookmarkDetailsContainer({ bookmark }: Props) {
  return (
    <Card>
      <CardHeader className="px-4 flex items-center gap-4">
        <>
          {bookmark.favicon ? (
            <Image
              className="border rounded-xl"
              src={bookmark.favicon}
              width={44}
              height={44}
              alt="favicon"
            />
          ) : (
            <GlobeIcon size={44} className="border rounded-xl" />
          )}
        </>
        <div className="flex flex-col">
          <CardTitle className="text-xl font-bold">{bookmark.title}</CardTitle>
          <CardDescription>{bookmark.url.split("//")[1]}</CardDescription>
        </div>
        <CardAction className="ml-auto">
          <BookmarkActions bookmark={bookmark} />
        </CardAction>
      </CardHeader>
      <Separator className="max-w-[90%] mx-auto" />
      <CardContent className="px-4 gap-4 flex flex-col">
        <p className="text-sm font-medium">{bookmark.description}</p>
        <div className="flex items-center gap-2">
          {bookmark.tags.map((tag) => (
            <p
              className="bg-accent px-2 py-0.5 rounded-lg text-xs font-medium"
              key={tag}
            >
              {tag}
            </p>
          ))}
        </div>
      </CardContent>
      <Separator className="mt-auto" />
      <CardFooter className="px-4 text-xs font-medium gap-4">
        <div className="flex items-center gap-1.5">
          <EyeIcon size={12} />
          {bookmark.visitCount}
        </div>
        {bookmark.lastVisited ? (
          <div className="flex items-center gap-1.5">
            <ClockIcon size={12} />
            {new Date(bookmark?.lastVisited).getDate()}{" "}
            {months[new Date(bookmark?.lastVisited).getMonth()]}
          </div>
        ) : null}
        <div className="flex items-center gap-1.5">
          <CalendarIcon size={12} />
          {new Date(bookmark.createdAt).getDate()}{" "}
          {months[new Date(bookmark.createdAt).getMonth()]}
        </div>
        {bookmark.pinned && !bookmark.isArchived && (
          <PinIcon size={16} className="stroke-foreground ml-auto" />
        )}
        {bookmark.isArchived && (
          <p className="bg-accent ml-auto px-2 py-0.5 rounded-lg text-xs font-medium">
            Archive
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

export default BookmarkDetailsContainer;
