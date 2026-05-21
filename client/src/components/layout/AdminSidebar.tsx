import { NavLink } from "react-router-dom";

import { cn } from "../../shared/utils/cn";

const adminLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Equipment", to: "/admin/equipment" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
  { label: "Reviews", to: "/admin/reviews" },
  { label: "Reports", to: "/admin/reports" },
];

export type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close admin navigation"
        className={cn(
          "fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[290px] flex-col border-r border-white/8 bg-adminBackground text-white transition-transform duration-300 lg:sticky lg:z-0 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="border-b border-white/8 px-6 py-6">
          <p className="font-heading text-2xl font-semibold tracking-[-0.04em]">BuildRent</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-primary">Admin operations</p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-adminSurface text-white shadow-industrial-dark"
                    : "text-white/62 hover:bg-adminSurface/75 hover:text-white",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/8 px-6 py-5 text-sm text-white/48">
          Dense, reliable workspace for operations, inventory and report control.
        </div>
      </aside>
    </>
  );
}
