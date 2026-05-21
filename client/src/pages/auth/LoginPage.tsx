import { Button, EmptyState, Input, PageHeader } from "../../shared/ui";

export function LoginPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        tone="admin"
        eyebrow="Access"
        title="Sign in to BuildRent"
        description="The visual shell is ready. Full form validation and submission flows will be expanded in the next auth stage."
      />

      <div className="grid gap-5">
        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Email</span>
            <Input type="email" placeholder="admin@buildrent.local" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/76">
            <span>Password</span>
            <Input type="password" placeholder="••••••••" className="border-white/10 bg-white/6 text-white placeholder:text-white/38 focus-visible:border-primary focus-visible:bg-white/10" />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="w-full justify-center">Sign in</Button>
          <Button variant="ghost" className="w-full justify-center border-white/10 bg-white/6 text-white hover:bg-white/10">
            Demo access
          </Button>
        </div>

        <EmptyState
          tone="admin"
          title="Auth logic already exists in store and API modules"
          description="This page is still intentionally lightweight. The full login UX will be completed in the dedicated auth implementation stage."
        />
      </div>
    </div>
  );
}
