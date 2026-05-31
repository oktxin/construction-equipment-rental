import { Badge, Button, Card, EmptyState } from "../../../../shared/ui";
import { formatDate } from "../../../rentalOrders/rentalOrdersUtils";
import type { AdminReview } from "../adminReviewsTypes";
import { truncateReviewText } from "../adminReviewsUtils";
import { AdminReviewRatingBadge } from "./AdminReviewRatingBadge";
import { AdminDataTable } from "../../components/AdminDataTable";

function PublishBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <Badge variant={isPublished ? "success" : "warning"}>
      {isPublished ? "Опубликован" : "Скрыт"}
    </Badge>
  );
}

function MobileReviewCard({
  review,
  onOpen,
  onEdit,
  onTogglePublish,
  onDelete,
}: {
  review: AdminReview;
  onOpen: (reviewId: string) => void;
  onEdit: (reviewId: string) => void;
  onTogglePublish: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
}) {
  return (
    <Card tone="admin" className="p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <AdminReviewRatingBadge rating={review.rating} />
            <div>
              <p className="font-medium text-white">{review.user.fullName}</p>
              <p className="mt-1 text-sm text-white/56">{review.equipment.name}</p>
            </div>
          </div>
          <PublishBadge isPublished={review.isPublished} />
        </div>

        <div className="grid gap-3 rounded-[22px] border border-white/8 bg-adminBackground/60 p-4 text-sm text-white/64">
          <div className="flex items-center justify-between gap-4">
            <span>Дата</span>
            <span className="text-right text-white">{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span>Превью</span>
            <span className="max-w-[220px] text-right text-white">
              {truncateReviewText(review.text, 90)}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onOpen(review.id)}
          >
            Открыть
          </Button>
          <Button
            variant="ghost"
            className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
            onClick={() => onEdit(review.id)}
          >
            Редактировать
          </Button>
          <Button
            variant={review.isPublished ? "secondary" : "primary"}
            className={review.isPublished ? "bg-secondary text-white hover:bg-secondary-soft" : "bg-primary text-foreground hover:bg-primary-strong"}
            onClick={() => onTogglePublish(review)}
          >
            {review.isPublished ? "Скрыть" : "Опубликовать"}
          </Button>
          <Button variant="danger" onClick={() => onDelete(review)}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
}

export type AdminReviewsTableProps = {
  items: AdminReview[];
  onOpen: (reviewId: string) => void;
  onEdit: (reviewId: string) => void;
  onTogglePublish: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
};

export function AdminReviewsTable({
  items,
  onOpen,
  onEdit,
  onTogglePublish,
  onDelete,
}: AdminReviewsTableProps) {
  return (
    <AdminDataTable
      rows={items}
      getRowKey={(item) => item.id}
      emptyState={
        <EmptyState
          tone="admin"
          title="Отзывы не найдены"
          description="Попробуйте изменить параметры фильтрации или очистить поисковый запрос."
        />
      }
      renderMobileCard={(item) => (
        <MobileReviewCard
          review={item}
          onOpen={onOpen}
          onEdit={onEdit}
          onTogglePublish={onTogglePublish}
          onDelete={onDelete}
        />
      )}
      columns={[
        {
          key: "user",
          header: "Пользователь",
          cellClassName: "min-w-[220px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="font-medium text-white">{item.user.fullName}</p>
              <p className="text-sm text-white/56">{item.user.email}</p>
            </div>
          ),
        },
        {
          key: "equipment",
          header: "Оборудование",
          cellClassName: "min-w-[220px]",
          render: (item) => (
            <div className="space-y-1">
              <p className="text-white">{item.equipment.name}</p>
              <p className="text-sm text-white/48">{item.equipment.category.name}</p>
            </div>
          ),
        },
        {
          key: "rating",
          header: "Рейтинг",
          cellClassName: "min-w-[120px]",
          render: (item) => <AdminReviewRatingBadge rating={item.rating} />,
        },
        {
          key: "text",
          header: "Текст",
          cellClassName: "min-w-[260px]",
          render: (item) => (
            <p className="text-sm leading-6 text-white/68">
              {truncateReviewText(item.text)}
            </p>
          ),
        },
        {
          key: "isPublished",
          header: "Публикация",
          cellClassName: "min-w-[140px]",
          render: (item) => <PublishBadge isPublished={item.isPublished} />,
        },
        {
          key: "createdAt",
          header: "Дата",
          cellClassName: "min-w-[140px]",
          render: (item) => <p className="text-white/68">{formatDate(item.createdAt)}</p>,
        },
        {
          key: "actions",
          header: "Действия",
          className: "text-right",
          cellClassName: "min-w-[360px] text-right",
          render: (item) => (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onOpen(item.id)}
              >
                Открыть
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border-white/10 bg-adminBackground text-white hover:bg-adminSurface-strong"
                onClick={() => onEdit(item.id)}
              >
                Редактировать
              </Button>
              <Button
                size="sm"
                variant={item.isPublished ? "secondary" : "primary"}
                className={item.isPublished ? "bg-secondary text-white hover:bg-secondary-soft" : "bg-primary text-foreground hover:bg-primary-strong"}
                onClick={() => onTogglePublish(item)}
              >
                {item.isPublished ? "Скрыть" : "Опубликовать"}
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(item)}>
                Удалить
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
