import { Link } from "react-router-dom";

import { Button, Card } from "../shared/ui";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-background px-4 py-10 sm:px-6">
      <Card className="w-full max-w-3xl p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-display bg-secondary p-6 text-background">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">404</p>
            <h1 className="mt-4 font-heading text-5xl font-semibold tracking-[-0.06em]">Маршрут не найден</h1>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
                Эта страница еще не подключена к основному маршруту.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/68">
                Вернитесь в публичную часть или откройте рабочую админку. Карта маршрутов уже собрана, но этот путь пока не ведет к живому экрану.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/">
                <Button>Вернуться на главную</Button>
              </Link>
              <Link to="/catalog">
                <Button variant="secondary">Открыть каталог</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
