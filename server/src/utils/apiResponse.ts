export function successResponse<T>(data: T, message?: string) {
  return {
    status: "success" as const,
    message,
    data,
  };
}

export function errorResponse(message: string, details?: unknown) {
  return {
    status: "error" as const,
    message,
    details: details ?? null,
  };
}
