"use client";

import { useTags } from "@/app/contexts/TagContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";

function TagsContainer({ tagObj }: { tagObj: Record<string, number> }) {
  const { tags, setTags } = useTags();

  function handleChange(check: CheckedState, key: string) {
    setTags((prev) =>
      check === true
        ? [...prev, { [key]: check }]
        : prev.filter((el) => Object.keys(el)[0] !== key)
    );
  }

  return (
    <li className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={Object.keys(tagObj)[0]}
          onCheckedChange={(check) =>
            handleChange(check, Object.keys(tagObj)[0])
          }
        />
        <Label
          htmlFor={Object.keys(tagObj)[0]}
          className="text-base font-semibold text-foreground"
        >
          {Object.keys(tagObj)}
        </Label>
      </div>
      <div className="text-[12px] font-medium text-foreground bg-muted border border-border rounded-full px-2 py-0.5">
        {Object.values(tagObj)}
      </div>
    </li>
  );
}

export default TagsContainer;
