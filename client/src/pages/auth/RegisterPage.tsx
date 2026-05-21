import { Button, EmptyState, Input, PageHeader } from "../../shared/ui";

export function RegisterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Access"
        title="Create a client account"
        description="This shell keeps the structure, hierarchy and field rhythm ready for the real registration flow."
      />

      <div className="grid gap-4">
        <label className="space-y-2 text-sm font-medium text-white/76">
          <span>Full name</span>
          <Input placeholder="Ivan Petrov" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
        </label>
        <label className="space-y-2 text-sm font-medium text-white/76">
          <span>Email</span>
          <Input type="email" placeholder="client@buildrent.local" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
        </label>
        <label className="space-y-2 text-sm font-medium text-white/76">
          <span>Phone</span>
          <Input placeholder="+375 29 111 00 00" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
        </label>
        <label className="space-y-2 text-sm font-medium text-white/76">
          <span>Password</span>
          <Input type="password" placeholder="Create a strong password" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
        </label>
      </div>

      <Button className="w-full justify-center">Create account</Button>

      <EmptyState
        tone="admin"
        title="Client onboarding comes in the next auth pass"
        description="Shared inputs, buttons and auth store are already in place, so the full register form can be built on top of this shell without redesigning the foundation."
      />
    </div>
  );
}
