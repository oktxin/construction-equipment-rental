import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  clearAuthError,
  register as registerAccount,
  selectAuth,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { Button, Input, PageHeader } from "../../shared/ui";

const authInputClassName =
  "border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Укажите имя и фамилию"),
    email: z
      .string()
      .trim()
      .min(1, "Укажите email")
      .email("Введите корректный email"),
    phone: z
      .string()
      .trim()
      .min(7, "Укажите корректный телефон")
      .regex(/^[+\d\s()-]{7,20}$/, "Укажите корректный телефон"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .regex(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/, "Пароль должен содержать букву и цифру"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    dispatch(clearAuthError());

    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.isInitialized && isAuthenticated && !successMessage) {
      navigate("/catalog", { replace: true });
    }
  }, [auth.isInitialized, isAuthenticated, navigate, successMessage]);

  const applyExampleProfile = () => {
    const uniqueSuffix = Date.now().toString().slice(-6);

    setSubmitError(null);
    setSuccessMessage(null);
    dispatch(clearAuthError());
    setValue("fullName", "Иван Петров", { shouldDirty: true, shouldValidate: true });
    setValue("email", `client.${uniqueSuffix}@buildrent.local`, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("phone", "+375 29 111 00 00", { shouldDirty: true, shouldValidate: true });
    setValue("password", "Client12345!", { shouldDirty: true, shouldValidate: true });
    setValue("confirmPassword", "Client12345!", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async ({ confirmPassword: _confirmPassword, ...values }: RegisterFormValues) => {
    setSubmitError(null);
    setSuccessMessage(null);
    dispatch(clearAuthError());

    try {
      await dispatch(registerAccount(values)).unwrap();
      setSuccessMessage("Аккаунт создан. Перенаправляем в каталог...");

      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/catalog", { replace: true });
      }, 500);
    } catch (error) {
      setSubmitError(typeof error === "string" ? error : "Не удалось создать аккаунт");
    }
  };

  const formError = submitError ?? auth.error;

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Регистрация"
        title="Создание аккаунта"
        description="Подготовьте клиентский профиль для аренды, избранного и отслеживания заявок в одном кабинете."
      />

      <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        {formError ? (
          <div className="rounded-display border border-danger/55 bg-danger/10 px-4 py-3 text-sm leading-6 text-white">
            {formError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-display border border-success/55 bg-success/10 px-4 py-3 text-sm leading-6 text-white">
            {successMessage}
          </div>
        ) : null}

        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>ФИО</span>
            <Input
              placeholder="Иван Петров"
              autoComplete="name"
              hasError={Boolean(errors.fullName)}
              className={authInputClassName}
              {...register("fullName")}
            />
            {errors.fullName ? (
              <p className="text-sm text-primary">{errors.fullName.message}</p>
            ) : null}
          </label>

          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Email</span>
            <Input
              type="email"
              placeholder="client@buildrent.local"
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
            <span>Телефон</span>
            <Input
              placeholder="+375 29 111 00 00"
              autoComplete="tel"
              hasError={Boolean(errors.phone)}
              className={authInputClassName}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-sm text-primary">{errors.phone.message}</p>
            ) : null}
          </label>

          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Пароль</span>
            <Input
              type="password"
              placeholder="Придумайте надёжный пароль"
              autoComplete="new-password"
              hasError={Boolean(errors.password)}
              className={authInputClassName}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-primary">{errors.password.message}</p>
            ) : null}
          </label>

          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Подтверждение пароля</span>
            <Input
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              hasError={Boolean(errors.confirmPassword)}
              className={authInputClassName}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="text-sm text-primary">{errors.confirmPassword.message}</p>
            ) : null}
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="submit" className="w-full min-w-0 justify-center" disabled={auth.isLoading}>
            {auth.isLoading ? "Создаём аккаунт..." : "Зарегистрироваться"}
          </Button>
          <Button
            variant="ghost"
            className="w-full min-w-0 justify-center border-white/10 bg-white/6 text-white hover:bg-white/10"
            onClick={applyExampleProfile}
            disabled={auth.isLoading}
          >
            Заполнить пример
          </Button>
        </div>

        <div className="rounded-display border border-white/10 bg-white/6 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Быстрый старт
          </p>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Кнопка заполняет форму примером нового клиента. Email создаётся уникальным, чтобы можно было повторять проверку регистрации.
          </p>
        </div>

        <p className="text-sm text-white/62">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            state={location.state}
            className="font-semibold text-primary transition hover:text-primary-strong"
          >
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
