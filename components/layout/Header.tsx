"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { primaryNav, footerNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActiveHref = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-line bg-paper-raised/80 backdrop-blur supports-[backdrop-filter]:sticky supports-[backdrop-filter]:top-0 z-40">
      <Container size="wide">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif-display text-lg font-semibold tracking-tight text-navy-950">
              Retail Operations Institute
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-faint">
              Research &amp; Strategy
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium text-ink-muted">
              {primaryNav.map((link) => {
                const isActive = isActiveHref(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "transition-colors hover:text-navy-900",
                        isActive && "font-semibold text-navy-950",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center rounded-sm bg-navy-950 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-navy-800"
          >
            Start a Conversation
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-sm p-2 text-navy-950 lg:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-paper-raised lg:hidden"
        >
          <Container size="wide">
            <ul className="flex flex-col divide-y divide-line py-2 text-base font-medium text-ink-muted">
              {footerNav.map((link) => {
                const isActive = isActiveHref(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block py-3",
                        isActive && "font-semibold text-navy-950",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
