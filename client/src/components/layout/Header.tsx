import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout, selectAuth, selectIsAuthenticated } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { Button } from "../../shared/ui";
import { cn } from "../../shared/utils/cn";
import { MobileNav } from "./MobileNav";

const publicLinks = [
  { label: "Главная", to: "/" },
  { label: "Каталог", to: "/catalog" },
  { label: "Как это работает", to: "/#how-it-works" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = auth.user?.role.name === "ADMIN";

  const initials = useMemo(() => {
    if (!auth.user?.fullName) {
      return "BR";
    }

    return auth.user.fullName
      .split(" ")
      .slice(0, 2)
      .map((item) => item[0]?.toUpperCase() ?? "")
      .join("");
  }, [auth.user?.fullName]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/55 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold uppercase tracking-[0.22em] text-primary">
              BR
            </span>
            <div className="min-w-0">
              <div className="truncate font-heading text-lg font-semibold tracking-[-0.03em] text-foreground">
                BuildRent
              </div>
              <div className="truncate text-xs uppercase tracking-[0.2em] text-foreground/48">
                Прокат техники
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {publicLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition hover:bg-card hover:text-foreground",
                    isActive ? "bg-card text-foreground shadow-industrial" : "text-foreground/66",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 rounded-full border border-border/60 bg-card px-4 py-2 shadow-industrial">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold tracking-[0.18em] text-foreground">
                    {initials}
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-foreground">
                      {auth.user?.fullName ?? "Профиль"}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.18em] text-foreground/45">
                      {isAdmin ? "Администратор" : "Клиентский кабинет"}
                    </span>
                  </span>
                </div>

                <Link to="/profile">
                  <Button variant="ghost">Профиль</Button>
                </Link>
                <Link to="/orders">
                  <Button variant="ghost">Мои заявки</Button>
                </Link>
                {isAdmin ? (
                  <Link to="/admin">
                    <Button variant="secondary">Админ-панель</Button>
                  </Link>
                ) : null}
                <Button variant="ghost" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button>Регистрация</Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-industrial lg:hidden"
            aria-label="Открыть навигацию"
            onClick={() => setMobileOpen(true)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} onLogout={handleLogout} />
    </>
  );
}
