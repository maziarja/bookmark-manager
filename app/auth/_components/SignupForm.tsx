"use client";

import { signupSchema, SignupType } from "@/lib/types";
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
import { BookmarkIcon, LoaderCircleIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { createUser } from "../_actions/createUser";
import { redirect } from "next/navigation";

function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupType) {
    const result = await createUser(data);

    if (result.success) redirect("/auth/login");

    if (!result.success) {
      form.setError("root", { message: result.message });
    }
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
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join us and start saving your favorite links — organized, searchable,
          and always within reach.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Full name *</FieldLabel>
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Email Address *</FieldLabel>
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
                  <FieldLabel htmlFor={field.name}>Password *</FieldLabel>
                  <Input
                    {...field}
                    type="password"
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
          {form.formState.errors.root && (
            <p className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex flex-col gap-3 items-center">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
            <p className="text-sm text-card-foreground ">
              Already have an account?{"  "}
              <Link className="font-bold hover:underline" href={"/auth/login"}>
                Log in
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

export default SignupForm;
