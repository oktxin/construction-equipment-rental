import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { AuthUser } from "../../../shared/types/auth";
import { Button, Card, LoadingSkeleton, Modal } from "../../../shared/ui";
import {
  getErrorMessage,
  isUnauthorizedError,
} from "../../../shared/utils/errorMessage";
import type { EquipmentReview } from "../../catalog/catalogTypes";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../reviewsApi";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm, type ReviewFormValues } from "./ReviewForm";

type MyReviewPanelProps = {
  equipmentId: string;
  currentUser: AuthUser | null;
  ownReview: EquipmentReview | null;
  isAuthReady: boolean;
  onReviewsChanged: () => Promise<void>;
};

export function MyReviewPanel({
  equipmentId,
  currentUser,
  ownReview,
  isAuthReady,
  onReviewsChanged,
}: MyReviewPanelProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<"create" | "view" | "edit">(
    ownReview ? "view" : "create",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    setMode(ownReview ? "view" : "create");
  }, [ownReview?.id]);

  const redirectToLogin = () => {
    navigate("/login", {
      state: {
        from: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
      },
    });
  };

  const runRefresh = async () => {
    try {
      await onReviewsChanged();
      return true;
    } catch {
      return false;
    }
  };

  const handleCreate = async (values: ReviewFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setFeedback(null);

    try {
      await createReview({
        equipmentId,
        rating: values.rating,
        text: values.text.trim(),
      });

      const isRefreshed = await runRefresh();
      setFeedback(
        isRefreshed
          ? {
              type: "success",
              message: "Отзыв опубликован",
            }
          : {
              type: "error",
              message: "Отзыв сохранён, но список пока не обновился. Попробуйте обновить страницу.",
            },
      );
    } catch (error) {
      if (isUnauthorizedError(error)) {
        redirectToLogin();
        return;
      }

      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (values: ReviewFormValues) => {
    if (!ownReview) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setFeedback(null);

    try {
      await updateReview(ownReview.id, {
        rating: values.rating,
        text: values.text.trim(),
      });

      const isRefreshed = await runRefresh();
      if (isRefreshed) {
        setMode("view");
      }

      setFeedback(
        isRefreshed
          ? {
              type: "success",
              message: "Отзыв обновлён",
            }
          : {
              type: "error",
              message: "Изменения сохранены, но список пока не обновился. Попробуйте обновить страницу.",
            },
      );
    } catch (error) {
      if (isUnauthorizedError(error)) {
        redirectToLogin();
        return;
      }

      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!ownReview) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setFeedback(null);

    try {
      await deleteReview(ownReview.id);

      const isRefreshed = await runRefresh();
      if (isRefreshed) {
        setMode("create");
      }

      setFeedback(
        isRefreshed
          ? {
              type: "success",
              message: "Отзыв удалён",
            }
          : {
              type: "error",
              message: "Отзыв удалён, но список пока не обновился. Попробуйте обновить страницу.",
            },
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      if (isUnauthorizedError(error)) {
        redirectToLogin();
        return;
      }

      setFeedback({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthReady) {
    return <LoadingSkeleton lines={4} className="min-h-[220px]" />;
  }

  if (!currentUser) {
    return (
      <Card className="p-5 sm:p-6" data-testid="review-login-cta">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
              Отзывы клиентов
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Войдите, чтобы оставить отзыв
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/64">
              После входа можно поставить оценку, рассказать об опыте аренды и вернуться на эту же карточку.
            </p>
          </div>

          <Button className="w-full justify-center sm:w-auto" onClick={redirectToLogin}>
            Войти
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-5 sm:p-6" data-testid="my-review-panel">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
              Отзывы клиентов
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {ownReview ? "Ваш отзыв" : "Оставить отзыв"}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/64">
              {ownReview
                ? "Оценку и текст можно обновить прямо на странице оборудования."
                : "Короткий честный отзыв поможет другим клиентам быстрее оценить технику."}
            </p>
          </div>

          {feedback ? (
            <div
              className={
                feedback.type === "success"
                  ? "rounded-display border border-success/30 bg-success/10 px-4 py-3 text-sm leading-6 text-success"
                  : "rounded-display border border-danger/30 bg-danger/10 px-4 py-3 text-sm leading-6 text-danger"
              }
            >
              {feedback.message}
            </div>
          ) : null}

          {ownReview && mode === "view" ? (
            <ReviewCard
              review={ownReview}
              isOwn
              isActionDisabled={isSubmitting}
              onEdit={() => {
                setSubmitError(null);
                setFeedback(null);
                setMode("edit");
              }}
              onDelete={() => setIsDeleteModalOpen(true)}
              className="border-accent/35"
            />
          ) : (
            <ReviewForm
              mode={mode === "edit" ? "edit" : "create"}
              initialValues={
                ownReview
                  ? {
                      rating: ownReview.rating,
                      text: ownReview.text,
                    }
                  : undefined
              }
              isSubmitting={isSubmitting}
              submitError={submitError}
              onSubmit={mode === "edit" ? handleUpdate : handleCreate}
              onCancel={
                mode === "edit"
                  ? () => {
                      setSubmitError(null);
                      setFeedback(null);
                      setMode("view");
                    }
                  : undefined
              }
            />
          )}
        </div>
      </Card>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => !isSubmitting && setIsDeleteModalOpen(false)}
        title="Удалить отзыв?"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-foreground/72">
            Это действие нельзя отменить.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              variant="danger"
              data-testid="confirm-delete-review"
              onClick={() => void handleDelete()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Удаляем..." : "Удалить"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
