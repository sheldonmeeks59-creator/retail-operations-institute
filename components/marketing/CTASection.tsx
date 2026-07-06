import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function CTASection({
  eyebrow = "Work with the Institute",
  title,
  dek,
  ctaLabel = "Start a Conversation",
  ctaHref = "/contact",
}: {
  eyebrow?: string;
  title: string;
  dek: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-navy-950 py-20 text-paper">
      <Container size="content" className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
          {eyebrow}
        </p>
        <h2 className="font-serif-display mt-3 text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-paper/75">{dek}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex items-center rounded-sm bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-600 hover:text-paper"
        >
          {ctaLabel}
        </Link>
      </Container>
    </section>
  );
}
