import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-5 md:px-8">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          {COMPANY.name}
        </a>

        <div className="flex items-center gap-8">
          <Link
            href="/login"
            className="text-sm text-text-secondary transition-colors duration-200 hover:text-white"
          >
            Login
          </Link>
          <a
            href="#contact"
            className="text-sm text-text-secondary transition-colors duration-200 hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
