import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TagsProvider } from "../contexts/TagContext";
import { VisitLoadingProvider } from "../contexts/visitLoadingContext";

async function BookmarkLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div>
      <VisitLoadingProvider>
        <TagsProvider>{children}</TagsProvider>
      </VisitLoadingProvider>
    </div>
  );
}

export default BookmarkLayout;
