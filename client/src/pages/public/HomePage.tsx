import { Link } from "react-router-dom";

import { Badge, Button, Card } from "../../shared/ui";

const advantages = [
  "Real stock visibility and rental-oriented status cues",
  "Clean split between public browsing and internal operations",
  "Prepared route and auth foundation for the full client flow",
];

const categoryShell = [
  "Demolition",
  "Mixers",
  "Compactors",
  "Generators",
];

const rentalSteps = [
  "Choose equipment",
  "Select dates and delivery",
  "Submit the rental request",
];

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative border-b border-border/55">
        <div className="mx-auto grid min-h-[calc(100dvh-76px)] max-w-[1440px] gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge variant="accent" className="w-fit">
              BuildRent foundation
            </Badge>
            <h1 className="mt-6 max-w-[18ch] font-heading text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-foreground">
              Construction rental with the weight of real inventory behind it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/68">
              This is the first frontend shell for BuildRent: industrial, warm, structured, and ready for catalog, checkout, favorites, reports and admin operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalog">
                <Button size="lg">Go to catalog</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Open access flow
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid auto-rows-[minmax(160px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-flow-dense">
            <Card className="overflow-hidden p-0 sm:col-span-2">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-card bg-[linear-gradient(140deg,rgba(22,24,27,0.93),rgba(46,50,56,0.82)),radial-gradient(circle_at_top_right,rgba(242,165,49,0.25),transparent_28%)] p-6 text-background">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_14px)] opacity-50" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">Public shell</p>
                    <h2 className="mt-4 max-w-[16ch] font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
                      Calm browsing outside, dense control inside.
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {advantages.map((item) => (
                      <div key={item} className="rounded-display border border-white/10 bg-white/6 p-4 text-sm leading-6 text-white/70">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {categoryShell.map((item) => (
              <Card key={item} hoverable className="p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">Category shell</p>
                <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.03em]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/66">
                  Placeholder block ready for live category counts, imagery and quick entry to the catalog.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rental-flow" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">How rental works</p>
            <h2 className="mt-4 max-w-[16ch] font-heading text-3xl font-semibold tracking-[-0.04em]">
              The next feature stages already have a visual path.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-foreground/68">
              The foundation is intentionally structured around the future catalog, detail, checkout and order history flows, not around isolated decorative blocks.
            </p>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            {rentalSteps.map((item, index) => (
              <Card key={item} hoverable className="p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-foreground/44">Step {index + 1}</p>
                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.03em]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/66">
                  Placeholder module prepared for real logic and API wiring in the next frontend stages.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
