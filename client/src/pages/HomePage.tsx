const highlights = [
  "B2B/B2C equipment catalog foundation",
  "Industrial design tokens and adaptive layout baseline",
  "Prepared routing, state management and API layer",
];

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/70 bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              BuildRent monorepo
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
                Industrial-grade project foundation for construction equipment rental.
              </h1>
              <p className="max-w-xl text-base leading-7 text-background/78 sm:text-lg">
                The platform skeleton is ready for the next этапы: Prisma data model,
                authentication, catalog APIs, and production UI modules.
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-xl gap-4 rounded-panel border border-background/15 bg-background/6 p-5 shadow-panel backdrop-blur-sm sm:grid-cols-3 lg:max-w-md lg:grid-cols-1">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-background/10 bg-background/8 p-4 text-sm leading-6 text-background/82"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2 md:px-8">
        <article className="rounded-panel border border-border bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Frontend
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            React + Vite + Tailwind base
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Workspace prepared with routing, Redux Toolkit store, shared API client and
            industrial design tokens for future screens.
          </p>
        </article>

        <article className="rounded-panel border border-border bg-white p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Backend
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Express + TypeScript + Prisma base
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            API server includes environment config, base routing, health check endpoint and
            centralized error handling for the next modules.
          </p>
        </article>
      </section>
    </main>
  );
}
