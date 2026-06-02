import { Link, Outlet, useLocation } from "react-router-dom";

type AuthRouteState = {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
  };
};

export function AuthLayout() {
  const location = useLocation();
  const routeState = location.state as AuthRouteState | null;
  const from = routeState?.from;
  const backTarget = from?.pathname
    ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
    : "/";
  const backLabel = from?.pathname ? "← Вернуться назад" : "← На главную";

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-secondary text-background">
      <div className="grid min-h-[100dvh] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,165,49,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(196,107,45,0.24),transparent_30%)]" />
          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-12">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Личный кабинет BuildRent
              </p>
              <h1 className="max-w-xl font-heading text-[clamp(3rem,4.2vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                Аренда строительного оборудования без лишних звонков
              </h1>
              <p className="max-w-lg text-base leading-7 text-background/70">
                Выбирайте технику, оформляйте заявку и отслеживайте статус аренды в одном личном кабинете.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Ролевой доступ уже подготовлен для клиентских и административных маршрутов.",
                "Дизайн-токены едины для публичной части и рабочей админки.",
                "Слой авторизации готов ко входу, регистрации и восстановлению сессии.",
                "Каркас страниц уже собран без риска сломать дальнейший продуктовый интерфейс.",
              ].map((item) => (
                <div key={item} className="rounded-display border border-white/10 bg-white/6 p-5 text-sm leading-6 text-background/74">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-3 py-6 sm:px-6 sm:py-10 lg:px-10">
          <div className="w-full min-w-0 max-w-[34rem] space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span className="font-heading text-base tracking-[-0.03em]">BuildRent</span>
              </Link>
              <Link
                to={backTarget}
                className="inline-flex items-center gap-2 self-start text-sm font-medium text-white/76 transition hover:text-white"
              >
                {backLabel}
              </Link>
            </div>

            <div className="w-full min-w-0 rounded-display border border-white/10 bg-adminSurface/85 p-5 shadow-industrial-dark-xl backdrop-blur-xl sm:p-8">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
