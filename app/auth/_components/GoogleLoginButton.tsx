"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, MailIcon } from "lucide-react";
import { useTransition } from "react";
import { googleLogin } from "../_actions/googleLogin";

function GoogleLoginButton() {
  const [isPending, startTransition] = useTransition();

  function handleGoogleLogin() {
    startTransition(async () => {
      await googleLogin();
    });
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      variant="outline"
      disabled={isPending}
      className="w-full"
    >
      {isPending ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <p className="flex items-center gap-2">
          Login with Gmail <MailIcon />
        </p>
      )}
    </Button>
  );
}

export default GoogleLoginButton;
