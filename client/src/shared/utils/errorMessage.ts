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

  if (status === 409 || normalizedMessage.includes("email is already in use")) {
    return "Пользователь с таким email уже существует";
  }

  if (status === 403 && normalizedMessage.includes("blocked")) {
    return "Аккаунт временно заблокирован";
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
