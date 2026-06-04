import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { getEquipmentById } from "../../features/catalog/catalogApi";
import { isEquipmentRentable } from "../../features/catalog/catalogAvailability";
import { EquipmentAvailability } from "../../features/catalog/components/EquipmentAvailability";
import { EquipmentAvailabilityBadge } from "../../features/catalog/components/EquipmentAvailabilityBadge";
import { EquipmentPrice } from "../../features/catalog/components/EquipmentPrice";
import type { EquipmentDetail } from "../../features/catalog/catalogTypes";
import {
  calculateRentalOrder,
  createRentalOrder,
  getMyOrders,
} from "../../features/rentalOrders/rentalOrdersApi";
import type {
  DeliveryType,
  RentalOrder,
  RentalOrderCalculateResponse,
} from "../../features/rentalOrders/rentalOrdersTypes";
import {
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Input,
  LoadingSkeleton,
  Select,
  StatusBadge,
} from "../../shared/ui";
import { getErrorMessage } from "../../shared/utils/errorMessage";
import { getDeliveryTypeLabel } from "../../shared/utils/statusLabels";

const currencyFormatter = new Intl.NumberFormat("ru-BY", {
  style: "currency",
  currency: "BYN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const today = new Date().toISOString().slice(0, 10);

type CheckoutFormValues = {
  startDate: string;
  endDate: string;
  quantity: number;
  deliveryType: DeliveryType;
  deliveryAddress: string;
  customerComment: string;
};

function createCheckoutSchema(quantityAvailable: number) {
  return z
    .object({
      startDate: z.string().trim().min(1, "Выберите дату начала аренды"),
      endDate: z.string().trim().min(1, "Выберите дату окончания аренды"),
      quantity: z.coerce.number().int().min(1, "Количество должно быть не меньше 1"),
      deliveryType: z.enum(["PICKUP", "DELIVERY"], {
        required_error: "Выберите способ получения",
      }),
      deliveryAddress: z.string().trim(),
      customerComment: z
        .string()
        .trim()
        .max(500, "Комментарий не должен превышать 500 символов"),
    })
    .superRefine((value, ctx) => {
      if (value.startDate && value.endDate && value.startDate > value.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Дата окончания не может быть раньше даты начала",
          path: ["endDate"],
        });
      }

      if (value.quantity > quantityAvailable) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Недостаточно оборудования в наличии",
          path: ["quantity"],
        });
      }

      if (value.deliveryType === "DELIVERY" && !value.deliveryAddress.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Укажите адрес доставки",
          path: ["deliveryAddress"],
        });
      }
    });
}

function CheckoutSkeleton() {
  return (
    <div className="space-y-8">
      <LoadingSkeleton lines={2} className="min-h-[72px]" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <LoadingSkeleton lines={10} className="min-h-[620px]" />
        <LoadingSkeleton lines={8} className="min-h-[420px]" />
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className={highlight ? "font-semibold text-foreground" : "text-foreground/62"}>
        {label}
      </span>
      <span
        className={
          highlight
            ? "font-heading text-xl font-semibold text-foreground"
            : "font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

function getCalculationKey(
  equipmentId: string | null,
  values: Pick<
    CheckoutFormValues,
    "startDate" | "endDate" | "quantity" | "deliveryType" | "deliveryAddress"
  >,
) {
  return JSON.stringify({
    equipmentId,
    startDate: values.startDate,
    endDate: values.endDate,
    quantity: values.quantity,
    deliveryType: values.deliveryType,
    deliveryAddress:
      values.deliveryType === "DELIVERY" ? values.deliveryAddress.trim() : "",
  });
}

function calculateSelectedDays(startDate: string, endDate: string) {
  if (!startDate || !endDate || startDate > endDate) {
    return null;
  }

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay) + 1;
}

function RentalCheckoutSuccess({ order }: { order: RentalOrder }) {
  return (
    <div className="space-y-6">
      <Card className="space-y-5 p-6 sm:p-7">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
            Заявка создана
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
            Заявка на аренду оформлена
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-foreground/68">
            Мы сохранили заказ в системе. Менеджер свяжется с вами для подтверждения
            деталей и согласования выдачи или доставки.
          </p>
        </div>

        <div className="grid gap-4 border-t border-border/45 pt-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-foreground/58">Номер заявки</p>
            <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {order.orderNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground/58">Статус</p>
            <div className="mt-2">
              <StatusBadge status={order.status} context="order" />
            </div>
          </div>
          <div>
            <p className="text-sm text-foreground/58">Сумма</p>
            <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
              {currencyFormatter.format(order.totalPrice)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/orders" className="sm:flex-1">
            <Button className="w-full justify-center">Перейти к моим заявкам</Button>
          </Link>
          <Link to="/catalog" className="sm:flex-1">
            <Button variant="ghost" className="w-full justify-center">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const equipmentId = searchParams.get("equipmentId");
  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
  const [equipmentError, setEquipmentError] = useState<string | null>(null);
  const [calculation, setCalculation] = useState<RentalOrderCalculateResponse | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<RentalOrder | null>(null);
  const [lastCalculatedKey, setLastCalculatedKey] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [ordersVerificationHint, setOrdersVerificationHint] = useState<string | null>(null);

  const quantityAvailable = equipment?.quantityAvailable ?? 0;
  const checkoutSchema = useMemo(
    () => createCheckoutSchema(quantityAvailable),
    [quantityAvailable],
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      startDate: today,
      endDate: today,
      quantity: 1,
      deliveryType: "PICKUP",
      deliveryAddress: "",
      customerComment: "",
    },
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });

  const currentCalculationKey = useMemo(
    () =>
      getCalculationKey(equipmentId, {
        startDate: watchedValues.startDate ?? "",
        endDate: watchedValues.endDate ?? "",
        quantity: Number(watchedValues.quantity ?? 1),
        deliveryType: watchedValues.deliveryType ?? "PICKUP",
        deliveryAddress: watchedValues.deliveryAddress ?? "",
      }),
    [
      equipmentId,
      watchedValues.deliveryAddress,
      watchedValues.deliveryType,
      watchedValues.endDate,
      watchedValues.quantity,
      watchedValues.startDate,
    ],
  );

  const selectedDays = calculateSelectedDays(
    watchedValues.startDate ?? "",
    watchedValues.endDate ?? "",
  );
  const formDisabled = !isEquipmentRentable(equipment);
  const isCalculationFresh =
    Boolean(calculation) &&
    Boolean(lastCalculatedKey) &&
    lastCalculatedKey === currentCalculationKey;

  useEffect(() => {
    if (!equipmentId) {
      setEquipment(null);
      setEquipmentError(null);
      setEquipmentLoading(false);
      return;
    }

    let isActive = true;

    const loadEquipment = async () => {
      setEquipmentLoading(true);
      setEquipmentError(null);

      try {
        const data = await getEquipmentById(equipmentId);
        if (!isActive) {
          return;
        }

        setEquipment(data);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setEquipment(null);
        setEquipmentError(getErrorMessage(error));
      } finally {
        if (isActive) {
          setEquipmentLoading(false);
        }
      }
    };

    void loadEquipment();

    return () => {
      isActive = false;
    };
  }, [equipmentId, reloadKey]);

  useEffect(() => {
    void trigger("quantity");
  }, [quantityAvailable, trigger]);

  useEffect(() => {
    if (!calculation) {
      return;
    }

    if (lastCalculatedKey !== currentCalculationKey) {
      setCalculation(null);
      setCalculationError(null);
    }
  }, [calculation, currentCalculationKey, lastCalculatedKey]);

  useEffect(() => {
    if (!equipment || formDisabled || createdOrder) {
      return;
    }

    const hasRequiredValues =
      Boolean(watchedValues.startDate) &&
      Boolean(watchedValues.endDate) &&
      Boolean(watchedValues.deliveryType) &&
      Number(watchedValues.quantity ?? 0) >= 1;

    if (!hasRequiredValues) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const isValid = await trigger([
        "startDate",
        "endDate",
        "quantity",
        "deliveryType",
        "deliveryAddress",
      ]);

      if (!isValid || !equipmentId) {
        return;
      }

      const values = getValues();

      try {
        setIsCalculating(true);
        setCalculationError(null);

        const data = await calculateRentalOrder({
          startDate: values.startDate,
          endDate: values.endDate,
          deliveryType: values.deliveryType,
          items: [
            {
              equipmentId,
              quantity: values.quantity,
            },
          ],
        });

        setCalculation(data);
        setLastCalculatedKey(
          getCalculationKey(equipmentId, {
            startDate: values.startDate,
            endDate: values.endDate,
            quantity: values.quantity,
            deliveryType: values.deliveryType,
            deliveryAddress: values.deliveryAddress,
          }),
        );
      } catch (error) {
        setCalculation(null);
        setCalculationError(getErrorMessage(error));
      } finally {
        setIsCalculating(false);
      }
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    createdOrder,
    equipment,
    equipmentId,
    formDisabled,
    getValues,
    trigger,
    watchedValues.deliveryAddress,
    watchedValues.deliveryType,
    watchedValues.endDate,
    watchedValues.quantity,
    watchedValues.startDate,
  ]);

  const handleCalculateClick = async () => {
    if (!equipmentId || formDisabled) {
      return;
    }

    const isValid = await trigger([
      "startDate",
      "endDate",
      "quantity",
      "deliveryType",
      "deliveryAddress",
    ]);

    if (!isValid) {
      setCalculation(null);
      return;
    }

    const values = getValues();

    try {
      setIsCalculating(true);
      setCalculationError(null);

      const data = await calculateRentalOrder({
        startDate: values.startDate,
        endDate: values.endDate,
        deliveryType: values.deliveryType,
        items: [
          {
            equipmentId,
            quantity: values.quantity,
          },
        ],
      });

      setCalculation(data);
      setLastCalculatedKey(
        getCalculationKey(equipmentId, {
          startDate: values.startDate,
          endDate: values.endDate,
          quantity: values.quantity,
          deliveryType: values.deliveryType,
          deliveryAddress: values.deliveryAddress,
        }),
      );
    } catch (error) {
      setCalculation(null);
      setCalculationError(getErrorMessage(error));
    } finally {
      setIsCalculating(false);
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!equipmentId || formDisabled) {
      return;
    }

    if (!isCalculationFresh) {
      setCalculationError("Пересчитайте стоимость перед созданием заявки");
      return;
    }

    try {
      setIsCreatingOrder(true);
      setCalculationError(null);
      setOrdersVerificationHint(null);

      const order = await createRentalOrder({
        startDate: values.startDate,
        endDate: values.endDate,
        deliveryType: values.deliveryType,
        deliveryAddress:
          values.deliveryType === "DELIVERY" ? values.deliveryAddress.trim() : null,
        customerComment: values.customerComment.trim() || null,
        items: [
          {
            equipmentId,
            quantity: values.quantity,
          },
        ],
      });

      setCreatedOrder(order);

      try {
        const myOrders = await getMyOrders({ limit: 10 });
        const existsInMyOrders = myOrders.items.some((item) => item.id === order.id);
        setOrdersVerificationHint(
          existsInMyOrders
            ? "Заявка подтверждена сервером и уже доступна в списке моих заявок."
            : "Заявка создана, но список моих заявок пока не подтвердил обновление.",
        );
      } catch {
        setOrdersVerificationHint(
          "Заявка создана, но проверка списка моих заявок сейчас недоступна.",
        );
      }
    } catch (error) {
      setCalculationError(getErrorMessage(error));
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (!equipmentId) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Оборудование не выбрано"
          description="Перейдите в каталог и откройте оформление аренды из карточки нужной позиции."
        >
          <div className="pt-2">
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          </div>
        </EmptyState>
      </main>
    );
  }

  if (equipmentLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <CheckoutSkeleton />
      </main>
    );
  }

  if (equipmentError || !equipment) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Не удалось загрузить оборудование"
          description={equipmentError ?? "Повторите попытку позже."}
        >
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button onClick={() => setReloadKey((value) => value + 1)}>Повторить</Button>
            <Button variant="ghost" onClick={() => navigate("/catalog")}>
              Перейти в каталог
            </Button>
          </div>
        </EmptyState>
      </main>
    );
  }

  if (createdOrder) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Каталог", to: "/catalog" },
            { label: "Оформление аренды" },
          ]}
          className="mb-6"
        />
        <RentalCheckoutSuccess order={createdOrder} />
        {ordersVerificationHint ? (
          <p className="mt-4 text-sm text-foreground/62">{ordersVerificationHint}</p>
        ) : null}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Главная", to: "/" },
            { label: "Каталог", to: "/catalog" },
            { label: "Оформление аренды" },
          ]}
        />

        <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
          <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Оформление аренды
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-foreground/68">
            Выберите даты, количество и способ получения. Мы покажем предварительный
            расчёт стоимости и подготовим заявку для отправки.
          </p>
          </div>

          <Link
            to={equipment ? `/equipment/${equipment.slug}` : "/catalog"}
            className="sm:self-start"
          >
            <Button variant="ghost" className="w-full justify-center sm:w-auto">
              {equipment ? "Назад к карточке" : "Вернуться в каталог"}
            </Button>
          </Link>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            {!isEquipmentRentable(equipment) ? (
              <Card className="border-warning/30 bg-warning/10 p-5">
                <p className="font-semibold text-warning-strong">
                  Это оборудование сейчас недоступно для аренды.
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/72">
                  У позиции нет свободного количества или она временно снята с выдачи.
                  Можно вернуться в каталог и выбрать другую технику.
                </p>
              </Card>
            ) : null}

            <Card className="p-6 sm:p-7">
              <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-foreground/76">
                    <span>Дата начала аренды</span>
                    <Input
                      type="date"
                      min={today}
                      hasError={Boolean(errors.startDate)}
                      disabled={formDisabled || isCreatingOrder}
                      {...register("startDate")}
                    />
                    {errors.startDate ? (
                      <p className="text-sm text-danger">{errors.startDate.message}</p>
                    ) : null}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground/76">
                    <span>Дата окончания аренды</span>
                    <Input
                      type="date"
                      min={watchedValues.startDate || today}
                      hasError={Boolean(errors.endDate)}
                      disabled={formDisabled || isCreatingOrder}
                      {...register("endDate")}
                    />
                    {errors.endDate ? (
                      <p className="text-sm text-danger">{errors.endDate.message}</p>
                    ) : null}
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-foreground/76">
                    <span>Количество</span>
                    <Input
                      type="number"
                      min={1}
                      max={Math.max(quantityAvailable, 1)}
                      hasError={Boolean(errors.quantity)}
                      disabled={formDisabled || isCreatingOrder}
                      {...register("quantity", { valueAsNumber: true })}
                    />
                    {errors.quantity ? (
                      <p className="text-sm text-danger">{errors.quantity.message}</p>
                    ) : (
                      <p className="text-sm text-foreground/58">
                        Доступно сейчас: {equipment.quantityAvailable}
                      </p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm font-medium text-foreground/76">
                    <span>Способ получения</span>
                    <Select
                      hasError={Boolean(errors.deliveryType)}
                      disabled={formDisabled || isCreatingOrder}
                      {...register("deliveryType")}
                    >
                      <option value="PICKUP">Самовывоз</option>
                      <option value="DELIVERY">Доставка</option>
                    </Select>
                    {errors.deliveryType ? (
                      <p className="text-sm text-danger">{errors.deliveryType.message}</p>
                    ) : null}
                  </label>
                </div>

                {watchedValues.deliveryType === "DELIVERY" ? (
                  <label className="space-y-2 text-sm font-medium text-foreground/76">
                    <span>Адрес доставки</span>
                    <Input
                      type="text"
                      placeholder="Минск, улица, дом, объект"
                      hasError={Boolean(errors.deliveryAddress)}
                      disabled={formDisabled || isCreatingOrder}
                      {...register("deliveryAddress")}
                    />
                    {errors.deliveryAddress ? (
                      <p className="text-sm text-danger">{errors.deliveryAddress.message}</p>
                    ) : null}
                  </label>
                ) : null}

                <label className="space-y-2 text-sm font-medium text-foreground/76">
                  <span>Комментарий к заявке</span>
                  <textarea
                    rows={5}
                    maxLength={500}
                    placeholder="Уточнения по времени, объекту или условиям передачи"
                    className={`w-full rounded-display border bg-white/70 px-4 py-3 text-[0.98rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none transition duration-300 placeholder:text-foreground/45 focus-visible:border-primary focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:border-border/50 disabled:bg-card disabled:text-foreground/50 ${
                      errors.customerComment
                        ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20"
                        : "border-border/80"
                    }`}
                    disabled={formDisabled || isCreatingOrder}
                    {...register("customerComment")}
                  />
                  {errors.customerComment ? (
                    <p className="text-sm text-danger">{errors.customerComment.message}</p>
                  ) : (
                    <p className="text-sm text-foreground/58">До 500 символов.</p>
                  )}
                </label>

                {calculationError ? (
                  <div className="rounded-display border border-danger/35 bg-danger/10 px-4 py-3 text-sm leading-6 text-danger">
                    {calculationError}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="sm:flex-1 sm:justify-center"
                    onClick={() => void handleCalculateClick()}
                    disabled={formDisabled || isCalculating || isCreatingOrder}
                  >
                    {isCalculating ? "Считаем стоимость..." : "Рассчитать стоимость"}
                  </Button>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="sm:flex-1 sm:justify-center"
                    disabled={
                      formDisabled || isCreatingOrder || isCalculating || !isCalculationFresh
                    }
                  >
                    {isCreatingOrder ? "Создаём заявку..." : "Создать заявку"}
                  </Button>
                </div>
              </form>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="space-y-5 p-6 xl:sticky xl:top-24">
              <div className="overflow-hidden rounded-card border border-border/55 bg-card">
                <div className="aspect-[16/11] bg-secondary/10">
                  {equipment.images[0] ? (
                    <img
                      src={equipment.images[0].url}
                      alt={equipment.images[0].alt ?? equipment.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-end bg-secondary p-5 text-background">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-primary">
                          BuildRent
                        </p>
                        <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em]">
                          {equipment.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <EquipmentAvailabilityBadge
                    status={equipment.status}
                    quantityAvailable={equipment.quantityAvailable}
                  />
                  <span className="rounded-full border border-border/55 bg-background/55 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/72">
                    {equipment.category.name}
                  </span>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {equipment.name}
                  </h2>
                  <p className="mt-1 text-sm uppercase tracking-[0.15em] text-foreground/46">
                    {[equipment.brand, equipment.model].filter(Boolean).join(" / ") ||
                      "Позиция BuildRent"}
                  </p>
                </div>

                <p className="text-sm leading-6 text-foreground/68">
                  {equipment.shortDescription ??
                    "Выбранная позиция готова к оформлению аренды после проверки дат и количества."}
                </p>
              </div>

              <EquipmentPrice
                dailyPrice={equipment.dailyPrice}
                depositAmount={equipment.depositAmount}
              />
              <EquipmentAvailability
                status={equipment.status}
                quantityAvailable={equipment.quantityAvailable}
              />

              <div className="space-y-3 rounded-display border border-border/55 bg-background/45 p-4">
                <SummaryRow label="Количество" value={`${watchedValues.quantity ?? 1} шт.`} />
                <SummaryRow label="Дней аренды" value={selectedDays ? `${selectedDays}` : "—"} />
                <SummaryRow
                  label="Получение"
                  value={getDeliveryTypeLabel(watchedValues.deliveryType ?? "PICKUP")}
                />
                <SummaryRow
                  label="Аренда"
                  value={currencyFormatter.format(calculation?.subtotal ?? 0)}
                />
                <SummaryRow
                  label="Залог"
                  value={currencyFormatter.format(
                    calculation?.depositTotal ??
                      equipment.depositAmount * Number(watchedValues.quantity ?? 1),
                  )}
                />
                <SummaryRow
                  label="Доставка"
                  value={currencyFormatter.format(calculation?.deliveryPrice ?? 0)}
                />
                <div className="border-t border-border/45 pt-3">
                  <SummaryRow
                    label="Итого"
                    value={currencyFormatter.format(calculation?.totalPrice ?? 0)}
                    highlight
                  />
                </div>
              </div>

              {calculation ? (
                <p className="text-sm leading-6 text-foreground/58">
                  Расчёт обновлён для периода{" "}
                  {dateFormatter.format(new Date(`${watchedValues.startDate}T00:00:00`))} по{" "}
                  {dateFormatter.format(new Date(`${watchedValues.endDate}T00:00:00`))}.
                </p>
              ) : (
                <p className="text-sm leading-6 text-foreground/58">
                  Укажите даты и количество. Предварительный расчёт появится автоматически и
                  также доступен по кнопке.
                </p>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
