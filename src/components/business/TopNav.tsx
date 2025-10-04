import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function TopNav() {
  return (
    <nav>
      <div className="flex justify-between items-center p-5 border-b border-brand-border">
        <Logo />
        <ThemeToggle />
      </div>
    </nav>
  );
}
