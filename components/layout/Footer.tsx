import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { footerNav } from "@/lib/nav";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy-950 text-paper">
      <Container size="wide">
        <div className="flex flex-col gap-10 py-14 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif-display text-lg font-semibold">
              Retail Operations Institute
            </p>
            <p className="mt-3 text-sm text-paper/70">
              Original frameworks, case studies, and executive insights on
              retail systems, store operations, and operational excellence.
            </p>
            <p className="mt-3 text-sm text-paper/50">
              Founded by {profile.name} · {profile.location}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {footerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-paper/70 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-paper/10 py-6 text-xs text-paper/50">
          © {new Date().getFullYear()} Retail Operations Institute. All
          frameworks and analysis are original work product.
        </div>
      </Container>
    </footer>
  );
}
