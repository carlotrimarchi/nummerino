import { Link } from "react-router";
import Logo from "@/web/components/Logo";
import { Navigation } from "./Navigation";

export function PageHeader() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Link to="/">
          <Logo />
        </Link>
        <h1 className="text-l">Your German numbers multi-purpose tool</h1>
      </div>
      <Navigation />
    </header>
  );
}
