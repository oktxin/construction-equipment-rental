import { Button } from "../../../shared/ui";

const textareaClassName =
  "min-h-[132px] w-full rounded-2xl border border-white/10 bg-adminBackground px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary focus:ring-2 focus:ring-primary/20";

export type AdminOrderCommentFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  message?: string | null;
  error?: string | null;
};

export function AdminOrderCommentForm({
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
  message,
  error,
}: AdminOrderCommentFormProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-adminBackground/60 p-5">
      <div className="space-y-2">
        <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-white">
          Комментарий менеджера
        </h3>
        <p className="text-sm leading-6 text-white/58">
          Этот комментарий виден в деталях заявки и помогает команде держать контекст.
        </p>
      </div>

      <textarea
        value={value}
        className={textareaClassName + " mt-4"}
        placeholder="Например: подтверждение после звонка клиенту, уточнение по доставке, причина паузы."
        onChange={(event) => onChange(event.target.value)}
      />

      {message ? <p className="mt-3 text-sm text-emerald-300">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

      <div className="mt-4 flex justify-end">
        <Button
          className="bg-primary text-foreground hover:bg-primary-strong"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? "Сохраняем..." : "Сохранить комментарий"}
        </Button>
      </div>
    </div>
  );
}

