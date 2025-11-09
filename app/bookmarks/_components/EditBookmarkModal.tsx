"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { addBookmarkSchema, AddBookmarkType, BookmarkType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  bookmark: BookmarkType;
};

function EditBookmarkModal({ bookmark }: Props) {
  const textareaLimitSize = 280;

  const form = useForm({
    resolver: zodResolver(addBookmarkSchema),
    defaultValues: {
      title: bookmark.title,
      description: bookmark.description,
      website: bookmark.url,
      tags: bookmark.tags.join(", "),
    },
  });

  function onSubmit(data: AddBookmarkType) {
    console.log(data);
    form.reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit bookmark</DialogTitle>
        <DialogDescription>
          Update your saved link details — change the title, description, URL,
          or tags anytime.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name} *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => {
            function handleChangeTextarea(e: ChangeEvent<HTMLTextAreaElement>) {
              const value = e.target.value;
              field.onChange(value.slice(0, textareaLimitSize));
            }

            return (
              <Field data-invalid={fieldState.invalid} className="gap-0">
                <FieldLabel htmlFor={field.name} className="mb-3">
                  {field.name} *
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  onChange={handleChangeTextarea}
                  value={field.value}
                  autoComplete="off"
                  className="mb-1"
                />
                <span className="text-xs text-accent-foreground text-right">
                  {field.value.length}/{textareaLimitSize}
                </span>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name} URL *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name} *</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => form.reset()}
              variant="outline"
              className="bg-card"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button type="submit" className="min-w-32.5">
            {!form.formState.isSubmitting ? "Save Bookmark" : <Spinner />}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditBookmarkModal;
