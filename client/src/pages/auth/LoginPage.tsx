import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Input, PageHeader } from "../../shared/ui";

const authInputClassName =
  "border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const applyDemoAccess = () => {
    setEmail("admin@buildrent.local");
    setPassword("Admin12345!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Вход"
        title="Вход в аккаунт"
        description="Откройте личный кабинет, чтобы перейти к каталогу, заявкам и истории аренды без лишних шагов."
      />

      <div className="grid gap-5">
        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Email</span>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@buildrent.local"
              className={authInputClassName}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Пароль</span>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
              className={authInputClassName}
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="w-full min-w-0 justify-center">Войти</Button>
          <Button
            variant="ghost"
            className="w-full min-w-0 justify-center border-white/10 bg-white/6 text-white hover:bg-white/10"
            onClick={applyDemoAccess}
          >
            Демо-доступ
          </Button>
        </div>

        <div className="rounded-display border border-white/10 bg-white/6 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Демо-доступ
          </p>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Кнопка подставляет тестовые данные демонстрационного аккаунта, чтобы форма оставалась полезной уже на этом этапе.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-adminBackground/45 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Email</p>
              <p className="mt-2 break-all text-sm text-white">admin@buildrent.local</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-adminBackground/45 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Пароль</p>
              <p className="mt-2 break-all text-sm text-white">Admin12345!</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/62">
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition hover:text-primary-strong"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
