import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  clearAuthError,
  login,
  selectAuth,
  selectIsAuthenticated,
  selectPostAuthFallbackPath,
} from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { Button, Input, PageHeader } from "../../shared/ui";

const authInputClassName =
  "border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Укажите email")
    .email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type RouteState = {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
};

const demoAccounts = {
  client: {
    title: "Клиент",
    email: "ivan.petrov@buildrent.local",
    password: "Client12345!",
  },
  admin: {
    title: "Администратор",
    email: "admin@buildrent.local",
    password: "Admin12345!",
  },
} as const;

function getRequestedPath(from: RouteState["from"]) {
  if (!from?.pathname) {
    return null;
  }

  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`;
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const fallbackPath = useAppSelector(selectPostAuthFallbackPath);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const routeState = location.state as RouteState | null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isInitialized || !isAuthenticated) {
      return;
    }

    const requestedPath = getRequestedPath(routeState?.from);
    const targetPath = auth.user?.role.name === "ADMIN" ? "/admin" : requestedPath ?? fallbackPath;

    navigate(targetPath, { replace: true });
  }, [auth.isInitialized, auth.user, fallbackPath, isAuthenticated, navigate, routeState]);

  const applyDemoAccess = (variant: keyof typeof demoAccounts) => {
    const account = demoAccounts[variant];

    setSubmitError(null);
    dispatch(clearAuthError());
    setValue("email", account.email, { shouldDirty: true, shouldValidate: true });
    setValue("password", account.password, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    dispatch(clearAuthError());

    try {
      await dispatch(login(values)).unwrap();
    } catch (error) {
      setSubmitError(typeof error === "string" ? error : "Не удалось выполнить вход");
    }
  };

  const formError = submitError ?? auth.error;

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Вход"
        title="Вход в аккаунт"
        description="Откройте личный кабинет, чтобы перейти к каталогу, заявкам и истории аренды без лишних шагов."
      />

      <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        {formError ? (
          <div className="rounded-display border border-danger/55 bg-danger/10 px-4 py-3 text-sm leading-6 text-white">
            {formError}
          </div>
        ) : null}

        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Email</span>
            <Input
              type="email"
              placeholder="ivan.petrov@buildrent.local"
              autoComplete="email"
              hasError={Boolean(errors.email)}
              className={authInputClassName}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-primary">{errors.email.message}</p>
            ) : null}
          </label>

          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Пароль</span>
            <Input
              type="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
              hasError={Boolean(errors.password)}
              className={authInputClassName}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-primary">{errors.password.message}</p>
            ) : null}
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="submit" className="w-full min-w-0 justify-center" disabled={auth.isLoading}>
            {auth.isLoading ? "Проверяем доступ..." : "Войти"}
          </Button>
          <Link to="/register" state={routeState}>
            <Button
              variant="ghost"
              className="w-full min-w-0 justify-center border-white/10 bg-white/6 text-white hover:bg-white/10"
              disabled={auth.isLoading}
            >
              Создать аккаунт
            </Button>
          </Link>
        </div>

        <div className="rounded-display border border-white/10 bg-white/6 p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Демо-доступ
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
                Быстрый вход помогает проверить клиентский и административный сценарии без ручного набора.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {Object.entries(demoAccounts).map(([key, account]) => (
              <div
                key={key}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-adminBackground/45 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">{account.title}</p>
                  <p className="break-all text-sm text-white">{account.email}</p>
                  <p className="text-sm text-white/62">{account.password}</p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-center border-white/10 bg-white/6 text-white hover:bg-white/10 sm:w-auto"
                  onClick={() => applyDemoAccess(key as keyof typeof demoAccounts)}
                  disabled={auth.isLoading}
                >
                  {account.title === "Клиент" ? "Войти как клиент" : "Войти как администратор"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/62">
          Нет аккаунта?{" "}
          <Link
            to="/register"
            state={routeState}
            className="font-semibold text-primary transition hover:text-primary-strong"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}
