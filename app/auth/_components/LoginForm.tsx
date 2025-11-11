"use client";

import { loginSchema, LoginType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { credentialLogin } from "../_actions/credentialLogin";
import GoogleLoginButton from "./GoogleLoginButton";
import Logo from "@/app/bookmarks/_components/Logo";

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginType) {
    const result = await credentialLogin(data);
    if (result.success) redirect("/bookmarks");
    if (!result.success) {
      form.setError("root", {
        message: result.message,
      });
    }
  }

  return (
    <Card className="w-full max-w-md gap-8">
      <CardHeader>
        <Logo className="mb-8" />
        <CardTitle className="text-2xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription>
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="flex-col flex items-center gap-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            <p className="text-sm text-card-foreground ">
              Don&#39;t have an account?{"  "}
              <Link
                className="font-bold hover:underline"
                href={"/auth/sign-up"}
              >
                Sign up
              </Link>
            </p>
            <div className="flex w-full items-center gap-2">
              <div className={cn("h-px w-full bg-muted")}></div>
              <p className="text-center text-sm text-card-foreground">Or</p>
              <div className={cn("h-px w-full bg-muted")}></div>
            </div>
            <GoogleLoginButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
