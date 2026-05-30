import { cn } from "../../../shared/utils/cn";

type ReviewRatingInputProps = {
  name?: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

const scores = [1, 2, 3, 4, 5] as const;

export function ReviewRatingInput({
  name = "review-rating",
  value,
  onChange,
  disabled = false,
}: ReviewRatingInputProps) {
  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="sr-only">Оценка</legend>

      <div className="flex flex-wrap gap-2">
        {scores.map((score) => {
          const isActive = value === score;

          return (
            <label key={score} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={score}
                checked={isActive}
                onChange={() => onChange(score)}
                disabled={disabled}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex min-w-[3.2rem] items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-accent/50 bg-accent/12 text-accent-strong shadow-industrial"
                    : "border-border/65 bg-background/55 text-foreground/72 hover:border-accent/35 hover:text-foreground",
                  disabled && "cursor-not-allowed opacity-60",
                )}
              >
                {score}
              </span>
            </label>
          );
        })}
      </div>

      <p className="text-sm text-foreground/58">
        {value >= 1 && value <= 5
          ? `Выбрано: ${value} из 5`
          : "Выберите оценку от 1 до 5"}
      </p>
    </fieldset>
  );
}
