"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TagsContextType = {
  tags: Record<string, CheckedState>[];
  setTags: Dispatch<SetStateAction<Record<string, CheckedState>[]>>;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Record<string, CheckedState>[]>([]);

  return (
    <TagsContext.Provider
      value={{
        tags,
        setTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export const useTags = () => {
  const context = useContext<TagsContextType | undefined>(TagsContext);
  if (context === undefined)
    throw new Error("Tags context was used outside of tags provider");
  return context;
};
