import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/marketing/CTASection";
import { ProfileHeadshot } from "@/components/profile/ProfileHeadshot";
import { FocusAreasGrid } from "@/components/profile/FocusAreasGrid";
import { CredentialsSection } from "@/components/profile/CredentialsSection";
import { FadeInUp } from "@/components/motion/FadeInUp";
import {
  profile,
  speakingEngagements,
  publications,
  awards,
  certifications,
  interviews,
  podcastAppearances,
  pressMentions,
} from "@/lib/profile";
import { hasHeadshot } from "@/lib/headshot";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Retail Operations Institute is a research platform on retail systems thinking, operational design, and execution.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const hasPhoto = hasHeadshot();

  return (
    <>
      <Container size="content" className="py-16">
        <PageHeader
          eyebrow="About the Institute"
          title="Not what we've done — how we think."
          dek="The Retail Operations Institute is a research and insight platform, not a portfolio. It exists to develop and publish original frameworks for how modern retail organizations improve performance."
        />
      </Container>

      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <ProfileHeadshot hasPhoto={hasPhoto} variant="about" className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none" />

          <FadeInUp mode="onScroll" className="max-w-content">
            <h2 className="font-serif-display text-3xl font-semibold text-navy-950">
              {profile.name}
            </h2>
            <p className="mt-1 text-lg font-medium text-navy-800">{profile.positioning}</p>

            <p className="prose-editorial mt-6 border-l-4 border-gold-500 pl-5 text-lg italic text-ink-muted">
              {profile.philosophy}
            </p>

            <div className="prose-editorial mt-8">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </FadeInUp>
        </div>
      </Container>

      <Container size="wide" className="mt-16">
        <FocusAreasGrid />

        <CredentialsSection title="Speaking Engagements" entries={speakingEngagements} />
        <CredentialsSection title="Publications" entries={publications} />
        <CredentialsSection title="Awards" entries={awards} />
        <CredentialsSection title="Certifications" entries={certifications} />
        <CredentialsSection title="Interviews" entries={interviews} />
        <CredentialsSection title="Podcast Appearances" entries={podcastAppearances} />
        <CredentialsSection title="Press Mentions" entries={pressMentions} />
      </Container>

      <div className="mt-20">
        <CTASection
          title="Bring these frameworks into your organization."
          dek="Reach out to discuss how systems thinking applies to your operating model."
        />
      </div>
    </>
  );
}
