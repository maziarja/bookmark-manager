"use client";

import { loginSchema, LoginType } from "@/app/types";
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
import { BookmarkIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginType) {
    console.log(data);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="font-bold mb-4 flex gap-2 items-center">
          <div className="bg-primary p-1.5 flex items-center justify-center rounded-xl">
            <BookmarkIcon className="inline-block text-white" size={18} />
          </div>
          <p className="font-bold text-lg">Bookmark Manager</p>
        </div>
        <CardTitle>Login to your account</CardTitle>
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
          <div className="flex-col flex items-center gap-3">
            <Button type="submit" className="w-full">
              Login
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
            <Button type="button" variant="outline" className="w-full">
              Login with Gmail
              <MailIcon />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
