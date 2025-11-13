"use client";

import { useTags } from "@/app/contexts/TagContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TagsType } from "@/lib/types";
import { CheckedState } from "@radix-ui/react-checkbox";

function TagsContainer({ tag }: { tag: TagsType[0] }) {
  const { tags, setTags } = useTags();

  function handleChangeTags(check: CheckedState, name: string) {
    if (check === true) {
      setTags((prev) => [...prev, name]);
    } else {
      setTags((prev) => prev.filter((p) => p !== name));
    }
  }
  return (
    <li className="relative flex items-center justify-between py-2.5">
      <div className="flex items-center  gap-2 cursor-pointer">
        <Checkbox
          className="cursor-pointer"
          id={tag.name}
          checked={tags.includes(tag.name)}
          onCheckedChange={(check) => handleChangeTags(check, tag.name)}
        />
        <Label
          htmlFor={tag.name}
          className="text-base cursor-pointer  font-semibold text-sidebar-foreground"
        >
          {tag.name}
        </Label>
      </div>
      <div className="text-[12px] font-medium text-foreground bg-accent border border-ring rounded-full px-2 py-0.5">
        {tag.count}
      </div>
    </li>
  );
}

export default TagsContainer;
