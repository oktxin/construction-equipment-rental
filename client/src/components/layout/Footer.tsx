import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Catalog", to: "/catalog" },
  { label: "Favorites", to: "/favorites" },
  { label: "My orders", to: "/orders" },
  { label: "Profile", to: "/profile" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary text-background">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="font-heading text-2xl font-semibold tracking-[-0.04em]">BuildRent</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-background/68">
              Industrial-grade rental platform for construction equipment, short-term site logistics and dependable order management.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Routes</p>
          <div className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-background/76 transition hover:text-background">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contacts</p>
          <div className="mt-4 space-y-3 text-sm text-background/76">
            <p>admin@buildrent.local</p>
            <p>+375 29 111 01 01</p>
            <p>Minsk, industrial rental desk</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-4 text-center text-xs uppercase tracking-[0.18em] text-background/45 sm:px-6 lg:px-8">
        BuildRent foundation · frontend shell
      </div>
    </footer>
  );
}
