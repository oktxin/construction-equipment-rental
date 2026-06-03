import { Outlet } from "react-router-dom";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

export function PublicLayout() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-4%] h-72 w-72 rounded-full bg-primary/14 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
