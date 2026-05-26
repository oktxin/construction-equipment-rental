import { Link, NavLink } from "react-router-dom";

import { selectAuth, selectIsAuthenticated } from "../../features/auth/authSlice";
import { useAppSelector } from "../../shared/hooks/redux";
import { Button } from "../../shared/ui";
import { cn } from "../../shared/utils/cn";

const publicLinks = [
  { label: "Главная", to: "/" },
  { label: "Каталог", to: "/catalog" },
  { label: "Как это работает", to: "/#how-it-works" },
];

const privateLinks = [
  { label: "Избранное", to: "/favorites" },
  { label: "Мои заявки", to: "/orders" },
  { label: "Отчёты", to: "/reports" },
];

export type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export function MobileNav({ open, onClose, onLogout }: MobileNavProps) {
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = auth.user?.role.name === "ADMIN";
  const links = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        aria-label="Закрыть подложку меню"
        className="absolute inset-0 bg-secondary/55 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border/50 bg-card px-5 py-6 shadow-industrial-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
              BuildRent
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
              Навигация
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-foreground"
            aria-label="Закрыть навигацию"
            onClick={onClose}
          >
            <span className="text-lg">+</span>
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "rounded-2xl px-4 py-3 text-base font-medium transition",
                  isActive
                    ? "bg-background text-foreground shadow-industrial"
                    : "text-foreground/72 hover:bg-background/60 hover:text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-display border border-border/70 bg-background/70 p-5">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground">{auth.user?.fullName}</p>
                <p className="text-sm text-foreground/58">{auth.user?.email}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/profile" onClick={onClose}>
                  <Button className="w-full justify-center">Профиль</Button>
                </Link>
                <Link to="/orders" onClick={onClose}>
                  <Button variant="ghost" className="w-full justify-center">
                    Мои заявки
                  </Button>
                </Link>
                {isAdmin ? (
                  <Link to="/admin" onClick={onClose}>
                    <Button variant="secondary" className="w-full justify-center">
                      Админ-панель
                    </Button>
                  </Link>
                ) : null}
                <Button variant="ghost" className="w-full justify-center" onClick={onLogout}>
                  Выйти
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm leading-6 text-foreground/62">
                Войдите, чтобы открыть избранное, отчёты и историю аренды в одном кабинете.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={onClose}>
                  <Button variant="secondary" className="w-full justify-center">
                    Войти
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button className="w-full justify-center">Регистрация</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
