import { Link } from "react-router-dom";

import { Button, Card } from "../shared/ui";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-background px-4 py-10 sm:px-6">
      <Card className="w-full max-w-3xl p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-display bg-secondary p-6 text-background">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">404</p>
            <h1 className="mt-4 font-heading text-5xl font-semibold tracking-[-0.06em]">Route missing</h1>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-foreground">
                This page has not been routed into the foundation yet.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/68">
                Return to the public shell or jump to the admin workspace. The route map is now in place, but this path does not point to a live screen.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/">
                <Button>Back to home</Button>
              </Link>
              <Link to="/catalog">
                <Button variant="secondary">Open catalog shell</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
