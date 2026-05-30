import axios from "axios";

type BackendErrorPayload = {
  message?: unknown;
  error?: unknown;
  details?: unknown;
};

function getMessageFromDetails(details: unknown): string | null {
  if (!details || typeof details !== "object") {
    return null;
  }

  if (Array.isArray(details)) {
    const firstItem = details.find((item) => typeof item === "string");
    return typeof firstItem === "string" ? firstItem : null;
  }

  const maybeFlattened = details as {
    formErrors?: unknown;
    fieldErrors?: Record<string, unknown>;
  };

  if (Array.isArray(maybeFlattened.formErrors)) {
    const formError = maybeFlattened.formErrors.find((item) => typeof item === "string");
    if (typeof formError === "string") {
      return formError;
    }
  }

  if (maybeFlattened.fieldErrors && typeof maybeFlattened.fieldErrors === "object") {
    for (const value of Object.values(maybeFlattened.fieldErrors)) {
      if (Array.isArray(value)) {
        const fieldError = value.find((item) => typeof item === "string");
        if (typeof fieldError === "string") {
          return fieldError;
        }
      }

      if (typeof value === "string") {
        return value;
      }
    }
  }

  return null;
}

function normalizeKnownMessage(message: string, status?: number) {
  const normalizedMessage = message.trim().toLowerCase();

  if (status === 401 || normalizedMessage.includes("invalid email or password")) {
    return "Неверный email или пароль";
  }

  if (normalizedMessage.includes("email is already in use")) {
    return "Пользователь с таким email уже существует";
  }

  if (status === 403 && normalizedMessage.includes("blocked")) {
    return "Аккаунт временно заблокирован";
  }

  if (normalizedMessage.includes("startdate cannot be later than enddate")) {
    return "Дата окончания не может быть раньше даты начала";
  }

  if (normalizedMessage.includes("deliveryaddress is required for delivery")) {
    return "Укажите адрес доставки";
  }

  if (normalizedMessage.includes("item quantity must be greater than zero")) {
    return "Количество должно быть не меньше 1";
  }

  if (normalizedMessage.includes("exceeds current availability")) {
    return "Недостаточно оборудования в наличии";
  }

  if (normalizedMessage.includes("is not available for rent")) {
    return "Это оборудование сейчас недоступно для аренды";
  }

  if (normalizedMessage.includes("is archived and cannot be rented")) {
    return "Эта позиция переведена в архив и недоступна для аренды";
  }

  if (normalizedMessage.includes("equipment not found")) {
    return "Оборудование не найдено";
  }

  if (normalizedMessage.includes("equipment slug is already in use")) {
    return "Slug оборудования уже используется";
  }

  if (normalizedMessage.includes("category slug is already in use")) {
    return "Slug категории уже используется";
  }

  if (normalizedMessage.includes("category not found")) {
    return "Категория не найдена";
  }

  if (normalizedMessage.includes("quantityavailable cannot be greater than quantitytotal")) {
    return "Доступное количество не может превышать общий остаток";
  }

  if (normalizedMessage.includes("category cannot be deleted while equipment is assigned to it")) {
    return "Категорию нельзя удалить, пока к ней привязано оборудование.";
  }

  if (normalizedMessage.includes("archived equipment cannot be added to favorites")) {
    return "Архивную позицию нельзя добавить в избранное";
  }

  if (normalizedMessage.includes("you have already left a review for this equipment")) {
    return "Вы уже оставили отзыв на это оборудование.";
  }

  if (normalizedMessage.includes("archived equipment cannot receive new reviews")) {
    return "Архивная позиция недоступна для новых отзывов";
  }

  if (normalizedMessage.includes("reviews for archived equipment cannot be updated")) {
    return "Нельзя обновить отзыв для архивной позиции";
  }

  if (normalizedMessage.includes("you do not have permission to edit this review")) {
    return "Нельзя редактировать чужой отзыв";
  }

  if (normalizedMessage.includes("you do not have permission to delete this review")) {
    return "Нельзя удалять чужой отзыв";
  }

  if (normalizedMessage.includes("review not found")) {
    return "Отзыв не найден";
  }

  if (normalizedMessage.includes("rental order not found")) {
    return "Заявка не найдена";
  }

  if (normalizedMessage.includes("order already has status")) {
    return "Заявка уже находится в этом статусе";
  }

  if (normalizedMessage.includes("status transition") && normalizedMessage.includes("is not allowed")) {
    return "Недопустимый переход статуса";
  }

  if (normalizedMessage.includes("no longer has enough stock for approval")) {
    return "Недостаточно техники в наличии для подтверждения";
  }

  if (normalizedMessage.includes("you do not have permission to view this rental order")) {
    return "Эта заявка недоступна для просмотра";
  }

  if (normalizedMessage.includes("you do not have permission to cancel this rental order")) {
    return "Эту заявку нельзя отменить";
  }

  if (normalizedMessage.includes("status transition") && normalizedMessage.includes("cancelled")) {
    return "Заявку с текущим статусом уже нельзя отменить";
  }

  if (normalizedMessage.includes("report not found")) {
    return "Отчёт не найден";
  }

  if (normalizedMessage.includes("user not found")) {
    return "Пользователь не найден";
  }

  if (normalizedMessage.includes("you do not have permission to update this user")) {
    return "Нет доступа для изменения профиля";
  }

  if (normalizedMessage.includes("you do not have permission to download this report")) {
    return "У вас нет доступа к этому документу";
  }

  if (normalizedMessage.includes("file") && normalizedMessage.includes("not found")) {
    return "Файл отчёта сейчас недоступен";
  }

  if (status === 400 || normalizedMessage.includes("validation failed")) {
    return "Проверьте введённые данные";
  }

  if ((status ?? 0) >= 500 || normalizedMessage.includes("internal server error")) {
    return "Сервер временно недоступен";
  }

  return message;
}

export function isUnauthorizedError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as BackendErrorPayload | undefined;
    const detailsMessage = getMessageFromDetails(data?.details);

    if (detailsMessage) {
      return normalizeKnownMessage(detailsMessage, status);
    }

    if (typeof data?.message === "string") {
      return normalizeKnownMessage(data.message, status);
    }

    if (typeof data?.error === "string") {
      return normalizeKnownMessage(data.error, status);
    }

    if ((status ?? 0) >= 500) {
      return "Сервер временно недоступен";
    }

    if (status === 400) {
      return "Проверьте введённые данные";
    }

    return error.message || "Не удалось выполнить запрос";
  }

  if (error instanceof Error) {
    return normalizeKnownMessage(error.message);
  }

  if (typeof error === "string") {
    return normalizeKnownMessage(error);
  }

  return "Сервер временно недоступен";
}
