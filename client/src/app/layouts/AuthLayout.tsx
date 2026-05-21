import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-secondary text-background">
      <div className="grid min-h-[100dvh] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,165,49,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(196,107,45,0.24),transparent_30%)]" />
          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-12">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                BuildRent access
              </p>
              <h1 className="max-w-xl font-heading text-[clamp(3rem,4.2vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                Reliable rental flows start with a calm, controlled entry point.
              </h1>
              <p className="max-w-lg text-base leading-7 text-background/70">
                This shell prepares authentication, route protection and role-aware access for both public clients and internal operators.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Role-aware access for client and admin routes",
                "Design tokens shared with the public and admin shells",
                "Auth store ready for login, register and fetchMe flows",
                "Placeholder screens prepared for the next feature stages",
              ].map((item) => (
                <div key={item} className="rounded-display border border-white/10 bg-white/6 p-5 text-sm leading-6 text-background/74">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl rounded-display border border-white/10 bg-adminSurface/85 p-6 shadow-industrial-dark-xl backdrop-blur-xl sm:p-8">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
