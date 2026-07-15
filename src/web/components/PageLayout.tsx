import { Outlet, ScrollRestoration } from "react-router";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";

export function PageLayout() {
  return (
    <div className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <PageHeader />
        <main>
          <Outlet />
        </main>
        <PageFooter />
      </div>
      <ScrollRestoration />
    </div>
  );
}
