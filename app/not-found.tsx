import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container size="content" className="py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
        404
      </p>
      <h1 className="font-serif-display mt-4 text-4xl font-semibold text-navy-950">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-sm bg-navy-950 px-6 py-3 text-sm font-semibold text-paper hover:bg-navy-800"
      >
        Return home
      </Link>
    </Container>
  );
}
