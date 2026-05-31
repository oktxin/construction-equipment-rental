import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../shared/ui";
import type { AdminReview, UpdateAdminReviewPayload } from "../adminReviewsTypes";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-white/10 bg-adminBackground px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const textareaClassName =
  "min-h-[160px] w-full rounded-2xl border border-white/10 bg-adminBackground px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Минимум 1").max(5, "Максимум 5"),
  text: z
    .string()
    .trim()
    .min(10, "Минимум 10 символов")
    .max(1000, "Максимум 1000 символов"),
});

type AdminReviewFormValues = z.infer<typeof reviewSchema>;

function buildDefaultValues(review: AdminReview): AdminReviewFormValues {
  return {
    rating: review.rating,
    text: review.text,
  };
}

export type AdminReviewEditFormProps = {
  review: AdminReview;
  isSubmitting?: boolean;
  successMessage?: string | null;
  serverError?: string | null;
  onSubmit: (values: UpdateAdminReviewPayload) => void;
};

export function AdminReviewEditForm({
  review,
  isSubmitting = false,
  successMessage,
  serverError,
  onSubmit,
}: AdminReviewEditFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AdminReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: buildDefaultValues(review),
  });

  useEffect(() => {
    reset(buildDefaultValues(review));
  }, [reset, review]);

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) =>
        onSubmit({
          rating: values.rating,
          text: values.text.trim(),
        }),
      )}
    >
      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Рейтинг</span>
          <div className="relative">
            <select
              className={fieldClassName + " appearance-none pr-11"}
              {...register("rating", { valueAsNumber: true })}
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} из 5
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white/40" />
          </div>
          {errors.rating ? (
            <p className="text-sm text-rose-300">{errors.rating.message}</p>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/78">Текст отзыва</span>
          <textarea
            className={textareaClassName}
            placeholder="Отредактируйте текст отзыва..."
            {...register("text")}
          />
          {errors.text ? (
            <p className="text-sm text-rose-300">{errors.text.message}</p>
          ) : (
            <p className="text-sm text-white/48">
              Длина текста от 10 до 1000 символов.
            </p>
          )}
        </label>
      </div>

      {successMessage ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      {serverError ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
          onClick={() => reset(buildDefaultValues(review))}
          disabled={isSubmitting || !isDirty}
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          className="bg-primary text-foreground hover:bg-primary-strong"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? "Сохраняем..." : "Сохранить отзыв"}
        </Button>
      </div>
    </form>
  );
}
