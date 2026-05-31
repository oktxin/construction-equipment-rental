import { PropsWithChildren, useEffect } from "react";

import { initializeAuth, selectAuth } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { LoadingSkeleton } from "../shared/ui";

export function AuthBootstrap({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  useEffect(() => {
    void dispatch(initializeAuth());
  }, [dispatch]);

  if (auth.token && !auth.isInitialized) {
    return (
      <main className="min-h-[100dvh] bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col gap-5 pt-12">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
              BuildRent
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
              Восстанавливаем сессию
            </h1>
            <p className="text-sm leading-6 text-foreground/62">
              Проверяем сохранённый доступ и возвращаем вас в рабочий сценарий.
            </p>
          </div>
          <LoadingSkeleton lines={6} className="min-h-[240px]" />
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
