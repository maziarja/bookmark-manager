import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) redirect("/bookmarks");
  return (
    <div className={cn("min-h-dvh flex justify-center items-center px-2.5")}>
      {children}
    </div>
  );
}

export default AuthLayout;
