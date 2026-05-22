import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Input, PageHeader } from "../../shared/ui";

const authInputClassName =
  "border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10";

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const applyDemoAccess = () => {
    setFullName("Иван Петров");
    setEmail("client@buildrent.local");
    setPhone("+375 29 111 00 00");
    setPassword("Client12345!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Регистрация"
        title="Создание аккаунта"
        description="Подготовьте клиентский профиль для аренды, избранного и отслеживания заявок в одном кабинете."
      />

      <div className="grid gap-5">
        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>ФИО</span>
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Иван Петров"
              className={authInputClassName}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Email</span>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="client@buildrent.local"
              className={authInputClassName}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Телефон</span>
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+375 29 111 00 00"
              className={authInputClassName}
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Пароль</span>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Придумайте надежный пароль"
              className={authInputClassName}
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className="w-full min-w-0 justify-center">Зарегистрироваться</Button>
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
            Кнопка подставляет пример клиентского профиля, чтобы проверить сетку формы и ритм полей без ручного ввода.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-adminBackground/45 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Клиент</p>
              <p className="mt-2 break-all text-sm text-white">Иван Петров</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-adminBackground/45 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Телефон</p>
              <p className="mt-2 break-all text-sm text-white">+375 29 111 00 00</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/62">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="font-semibold text-primary transition hover:text-primary-strong">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
