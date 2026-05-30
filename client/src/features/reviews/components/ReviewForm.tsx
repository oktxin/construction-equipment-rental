import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

import { Button } from "../../../shared/ui";
import { ReviewRatingInput } from "./ReviewRatingInput";

const reviewSchema = z.object({
  rating: z
    .number({
      required_error: "Выберите оценку",
      invalid_type_error: "Выберите оценку",
    })
    .min(1, "Выберите оценку")
    .max(5, "Выберите оценку"),
  text: z
    .string()
    .trim()
    .min(10, "Отзыв должен содержать не менее 10 символов")
    .max(1000, "Отзыв слишком длинный"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

type ReviewFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<ReviewFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: (values: ReviewFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

export function ReviewForm({
  mode,
  initialValues,
  isSubmitting = false,
  submitError,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: initialValues?.rating ?? 0,
      text: initialValues?.text ?? "",
    },
  });

  const reviewText = watch("text") ?? "";

  useEffect(() => {
    reset({
      rating: initialValues?.rating ?? 0,
      text: initialValues?.text ?? "",
    });
  }, [initialValues?.rating, initialValues?.text, reset]);

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)} data-testid="review-form">
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground/78">Оценка</span>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <ReviewRatingInput
              name="review-rating"
              value={field.value ?? 0}
              onChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.rating ? <p className="text-sm text-danger">{errors.rating.message}</p> : null}
      </div>

      <label className="block space-y-2 text-sm font-medium text-foreground/78">
        <span>Текст отзыва</span>
        <textarea
          rows={5}
          maxLength={1000}
          placeholder="Расскажите, как прошла аренда, в каком состоянии было оборудование и что понравилось в работе."
          className={`w-full rounded-display border bg-white/70 px-4 py-3 text-[0.98rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none transition duration-300 placeholder:text-foreground/45 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-card disabled:text-foreground/50 ${
            errors.text
              ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20"
              : "border-border/80"
          }`}
          disabled={isSubmitting}
          {...register("text")}
        />
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className={errors.text ? "text-danger" : "text-foreground/56"}>
            {errors.text?.message ?? "От 10 до 1000 символов."}
          </span>
          <span className="text-foreground/46">{reviewText.trim().length} / 1000</span>
        </div>
      </label>

      {submitError ? (
        <div className="rounded-display border border-danger/30 bg-danger/10 px-4 py-3 text-sm leading-6 text-danger">
          {submitError}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          type="submit"
          className="w-full justify-center sm:w-auto"
          disabled={isSubmitting || (mode === "edit" && !isDirty)}
        >
          {isSubmitting
            ? mode === "create"
              ? "Публикуем..."
              : "Сохраняем..."
            : mode === "create"
              ? "Опубликовать отзыв"
              : "Сохранить изменения"}
        </Button>

        {mode === "edit" && onCancel ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-center sm:w-auto"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
        ) : null}
      </div>
    </form>
  );
}
