import { useState } from "react";

import { Button, Card, Modal } from "../../../shared/ui";
import { getErrorMessage } from "../../../shared/utils/errorMessage";
import { cancelRentalOrder } from "../rentalOrdersApi";
import type { RentalOrder } from "../rentalOrdersTypes";
import { canCancelRentalOrder } from "../rentalOrdersUtils";

export type OrderActionsProps = {
  order: RentalOrder;
  onOrderUpdated?: (order: RentalOrder) => void;
};

export function OrderActions({ order, onOrderUpdated }: OrderActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const canCancel = canCancelRentalOrder(order.status);

  const handleCancel = async () => {
    try {
      setIsSubmitting(true);
      setFeedback(null);

      const updatedOrder = await cancelRentalOrder(order.id);
      onOrderUpdated?.(updatedOrder);
      setFeedback({
        type: "success",
        message: "Заявка отменена. Статус обновлен на странице.",
      });
      setIsModalOpen(false);
    } catch (error) {
      setFeedback({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Действия
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground/62">
              Управление заявкой доступно, пока она не перешла в финальный статус.
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

          {canCancel ? (
            <div className="rounded-display border border-danger/25 bg-danger/6 p-4">
              <p className="font-semibold text-foreground">Отменить заявку</p>
              <p className="mt-2 text-sm leading-6 text-foreground/68">
                Если планы изменились, заявку можно отменить до активной выдачи техники.
              </p>
              <div className="mt-4">
                <Button
                  variant="danger"
                  className="w-full justify-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  Отменить заявку
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-display border border-border/60 bg-background/45 p-4 text-sm leading-6 text-foreground/68">
              Для текущего статуса дополнительные действия не требуются. История заявки и
              документы остаются доступны в этом экране.
            </div>
          )}
        </div>
      </Card>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Отменить заявку?">
        <div className="space-y-5">
          <p className="text-sm leading-6 text-foreground/72">
            После отмены заявка перейдет в статус «Отменена». Это действие доступно только
            для неподтвержденных и подтвержденных заявок.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Не отменять
            </Button>
            <Button
              variant="danger"
              onClick={() => void handleCancel()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отменяем..." : "Отменить заявку"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
