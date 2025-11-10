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
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { createBookmark } from "../_actions/createBookmark";
import { updateBookmark } from "../_actions/updateBookmark";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

type Props = {
  bookmark?: BookmarkType;
  mode?: "add" | "edit";
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
};

function EditBookmarkModal({
  bookmark,
  mode = "edit",
  setOpenEditModal,
}: Props) {
  const textareaLimitSize = 280;
  const form = useForm({
    resolver: zodResolver(addBookmarkSchema),
    defaultValues: {
      title: bookmark?.title || "",
      description: bookmark?.description || "",
      website: bookmark?.url || "",
      tags: bookmark?.tags.join(", ") || "",
    },
  });

  useEffect(() => {
    if (bookmark) {
      form.reset({
        title: bookmark?.title || "",
        description: bookmark?.description || "",
        website: bookmark?.url || "",
        tags: bookmark?.tags.join(", ") || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        website: "",
        tags: "",
      });
    }
  }, [bookmark, form]);

  async function onSubmit(data: AddBookmarkType) {
    if (mode === "add") {
      const result = await createBookmark(data);
      if (result.success) {
        form.reset();
        setOpenEditModal(false);
        toast(
          <p className="text-sm font-medium">Bookmark added successfully.</p>,
          { icon: <CheckIcon size={20} /> }
        );
      }
    }

    if (mode === "edit") {
      data.id = bookmark?._id;
      const result = await updateBookmark(data);
      if (result.success) {
        form.reset();
        setOpenEditModal(false);
        toast(<p className="text-sm font-medium">Changes saved.</p>, {
          icon: <CheckIcon size={20} />,
        });
      }
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "edit" ? "Edit" : "Add a"} bookmark</DialogTitle>
        <DialogDescription>
          {mode === "edit"
            ? "Update your saved link details — change the title, description, URL, or tags anytime."
            : "Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name} *</FieldLabel>
              <div className="space-y-1.5">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{field.name} *</FieldLabel>

                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  onChange={handleChangeTextarea}
                  value={field.value}
                  autoComplete="off"
                />
                <div className="flex">
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <span className="text-xs ml-auto text-accent-foreground text-right">
                    {field.value.length}/{textareaLimitSize}
                  </span>
                </div>
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
              <div className="space-y-1.5">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            </Field>
          )}
        />
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name} *</FieldLabel>
              <div className="space-y-1.5">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="e.g. Design, Learning, Tools"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
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
            {!form.formState.isSubmitting ? (
              mode === "edit" ? (
                "Save Bookmark"
              ) : (
                "Add bookmark"
              )
            ) : (
              <Spinner />
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditBookmarkModal;
