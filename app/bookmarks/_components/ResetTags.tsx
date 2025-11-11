"use client";

import { useTags } from "@/app/contexts/TagContext";

function ResetTags() {
  const { tags, setTags } = useTags();
  if (tags.length === 0) return null;
  return (
    <button
      onClick={() => setTags([])}
      className="ml-auto text-xs font-medium underline cursor-pointer"
    >
      Reset
    </button>
  );
}

export default ResetTags;
