import { HeroSection } from "@/components/hero-section";
import { TogetherCounter } from "@/components/together-counter";
import { WhyILoveYou } from "@/components/why-i-love-you";
import { MemoriesGallery } from "@/components/memories-gallery";
import { TimelineSection } from "@/components/timeline-section";
import { LittleNotes } from "@/components/little-notes";
import { LoveLetter } from "@/components/love-letter";
import { AnnoyMeForever } from "@/components/annoy-me-forever";
import { SiteFooter } from "@/components/site-footer";
import { MusicToggle } from "@/components/music-toggle";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <TogetherCounter />
      <WhyILoveYou />
      <MemoriesGallery />
      <TimelineSection />
      <LittleNotes />
      <LoveLetter />
      <AnnoyMeForever />
      <SiteFooter />
      <MusicToggle />
    </main>
  );
}
