import { Link } from "react-router-dom";

import { logout, selectAuth } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { Button, Breadcrumbs } from "../../shared/ui";

export type AdminTopbarProps = {
  onOpenSidebar: () => void;
};

export function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  return (
    <div className="sticky top-0 z-30 border-b border-white/8 bg-adminBackground/92 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-adminSurface text-white lg:hidden"
            aria-label="Открыть меню администратора"
            onClick={onOpenSidebar}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>

          <div className="space-y-2">
            <Breadcrumbs
              tone="admin"
              items={[
                { label: "BuildRent", to: "/" },
                { label: "Админка", to: "/admin" },
                { label: auth.user?.role.name === "ADMIN" ? "Операции" : "Рабочая зона" },
              ]}
            />
            <p className="text-sm text-white/52">
              Рабочее пространство с защитой маршрутов, общим UI-слоем и подготовленными экранами.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/profile">
            <Button variant="ghost" className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong">
              Профиль
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="border-white/10 bg-adminSurface text-white hover:bg-adminSurface-strong"
            onClick={() => dispatch(logout())}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
