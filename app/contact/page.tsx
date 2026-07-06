import type { Metadata } from "next";
import { Mail, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Retail Operations Institute.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container size="content" className="py-16">
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation"
        dek="For speaking engagements, consulting inquiries, or questions about a framework, reach out directly."
      />

      <div className="mt-10 flex flex-col gap-4">
        <a
          href="mailto:sheldonmeeks59@gmail.com"
          className="flex items-center gap-3 rounded-sm border border-line bg-paper-raised px-6 py-4 text-navy-950 transition-colors hover:border-navy-700"
        >
          <Mail className="size-5" aria-hidden />
          <span className="font-medium">sheldonmeeks59@gmail.com</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-sm border border-line bg-paper-raised px-6 py-4 text-navy-950 transition-colors hover:border-navy-700"
        >
          <ExternalLink className="size-5" aria-hidden />
          <span className="font-medium">Connect on LinkedIn</span>
        </a>
      </div>
    </Container>
  );
}
