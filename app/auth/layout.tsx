import { cn } from "@/lib/utils";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("min-h-dvh flex justify-center items-center px-2.5")}>
      {children}
    </div>
  );
}

export default AuthLayout;
