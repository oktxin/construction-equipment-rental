import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { fetchMe, selectAuth } from "../../features/auth/authSlice";
import { formatDate } from "../../features/rentalOrders/rentalOrdersUtils";
import { updateProfile } from "../../features/profile/profileApi";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Input,
  PageHeader,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import { getUserRoleLabel } from "../../shared/utils/statusLabels";

const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Укажите имя не короче 2 символов"),
  phone: z
    .string()
    .trim()
    .min(7, "Укажите телефон не короче 7 символов")
    .regex(/^\+?[0-9]{7,20}$/, "Используйте телефон в международном формате"),
  avatarUrl: z
    .union([z.string().trim().url("Укажите корректный URL"), z.literal("")])
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const quickActions = [
  {
    title: "Мои заявки",
    description: "Откройте текущие и завершённые аренды.",
    to: "/orders",
  },
  {
    title: "Избранное",
    description: "Вернитесь к сохранённой технике без нового поиска.",
    to: "/favorites",
  },
  {
    title: "Отчёты",
    description: "Скачайте документы по заявкам и истории аренды.",
    to: "/reports",
  },
  {
    title: "Каталог",
    description: "Подберите новую технику для следующей аренды.",
    to: "/catalog",
  },
] as const;

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const user = auth.user;
  const initials = useMemo(() => {
    if (!user?.fullName) {
      return "BR";
    }

    return user.fullName
      .split(" ")
      .slice(0, 2)
      .map((item) => item[0]?.toUpperCase() ?? "")
      .join("");
  }, [user?.fullName]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      avatarUrl: user?.avatarUrl ?? "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      avatarUrl: user?.avatarUrl ?? "",
    });
  }, [reset, user?.avatarUrl, user?.fullName, user?.phone]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      return;
    }

    setFeedback(null);
    setIsSaving(true);

    try {
      const updatedUser = await updateProfile(user.id, {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        avatarUrl: values.avatarUrl?.trim() ? values.avatarUrl.trim() : null,
      });

      reset({
        fullName: updatedUser.fullName,
        phone: updatedUser.phone ?? "",
        avatarUrl: updatedUser.avatarUrl ?? "",
      });
      void dispatch(fetchMe());

      setFeedback({
        type: "success",
        message: "Профиль обновлён. Новые данные уже доступны в личном кабинете.",
      });
    } catch (submitError) {
      setFeedback({
        type: "error",
        message: getErrorMessage(submitError),
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Профиль недоступен"
          description="Не удалось загрузить данные пользователя. Попробуйте обновить страницу или войти снова."
        >
          <div className="pt-2">
            <Link to="/login">
              <Button>Перейти ко входу</Button>
            </Link>
          </div>
        </EmptyState>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Профиль" },
          ]}
        />

        <PageHeader
          eyebrow="Клиентский кабинет"
          title="Профиль"
          description="Управляйте контактными данными для заявок аренды."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-secondary text-xl font-bold text-primary shadow-industrial-dark">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-strong">
                      Карточка пользователя
                    </p>
                    <h2 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
                      {user.fullName}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-foreground/62">
                      Данные отсюда используются в заявках, документах и клиентских уведомлениях.
                    </p>
                  </div>
                </div>

                <div className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2">
                  <div className="min-w-0 rounded-display border border-border/60 bg-background/45 p-4">
                    <p className="text-sm text-foreground/56">Email</p>
                    <p className="mt-2 break-all text-sm font-semibold leading-6 text-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="min-w-0 rounded-display border border-border/60 bg-background/45 p-4">
                    <p className="text-sm text-foreground/56">Телефон</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {user.phone ?? "Не указан"}
                    </p>
                  </div>
                  <div className="min-w-0 rounded-display border border-border/60 bg-background/45 p-4">
                    <p className="text-sm text-foreground/56">Роль</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {getUserRoleLabel(user.role.name)}
                    </p>
                  </div>
                  <div className="min-w-0 rounded-display border border-border/60 bg-background/45 p-4">
                    <p className="text-sm text-foreground/56">Дата регистрации</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-7">
              <div className="space-y-5">
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    Редактирование профиля
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/62">
                    Изменения сохраняются в аккаунт и сразу используются в следующих заявках.
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

                <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-foreground/78">
                      <span>Email</span>
                      <Input value={user.email} disabled />
                    </label>

                    <label className="space-y-2 text-sm font-medium text-foreground/78">
                      <span>Роль</span>
                      <Input value={getUserRoleLabel(user.role.name)} disabled />
                    </label>
                  </div>

                  <div className="grid gap-5">
                    <label className="space-y-2 text-sm font-medium text-foreground/78">
                      <span>ФИО</span>
                      <Input hasError={Boolean(errors.fullName)} {...register("fullName")} />
                      {errors.fullName ? (
                        <p className="text-sm text-danger">{errors.fullName.message}</p>
                      ) : null}
                    </label>

                    <label className="space-y-2 text-sm font-medium text-foreground/78">
                      <span>Телефон</span>
                      <Input
                        placeholder="+375291234567"
                        hasError={Boolean(errors.phone)}
                        {...register("phone")}
                      />
                      {errors.phone ? (
                        <p className="text-sm text-danger">{errors.phone.message}</p>
                      ) : null}
                    </label>

                    <label className="space-y-2 text-sm font-medium text-foreground/78">
                      <span>Ссылка на аватар</span>
                      <Input
                        placeholder="https://example.com/avatar.jpg"
                        hasError={Boolean(errors.avatarUrl)}
                        {...register("avatarUrl")}
                      />
                      {errors.avatarUrl ? (
                        <p className="text-sm text-danger">{errors.avatarUrl.message}</p>
                      ) : (
                        <p className="text-sm text-foreground/56">
                          Поле необязательное. Оставьте пустым, если аватар не нужен.
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button type="submit" disabled={isSaving || !isDirty}>
                      {isSaving ? "Сохраняем..." : "Сохранить изменения"}
                    </Button>
                    <p className="text-sm text-foreground/56">
                      Email и роль доступны только для просмотра.
                    </p>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    Быстрые действия
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    Основные клиентские сценарии собраны рядом, чтобы не искать их в навигации.
                  </p>
                </div>

                <div className="grid gap-3">
                  {quickActions.map((action) => (
                    <Link key={action.to} to={action.to}>
                      <Card hoverable className="h-full border-border/60 bg-background/45 p-4">
                        <p className="font-semibold text-foreground">{action.title}</p>
                        <p className="mt-2 text-sm leading-6 text-foreground/62">
                          {action.description}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
