import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ProgramTracks } from "@/components/home/ProgramTracks";
import { Features } from "@/components/home/Features";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { StandardsGrid } from "@/components/sections/StandardsGrid";
import { Pricing } from "@/components/home/Pricing";
import { JoinNetworkCTA } from "@/components/home/JoinNetworkCTA";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionDivider } from "@/components/visuals/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <SectionDivider />
      <ProgramTracks />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <RoadmapTimeline />
      <SectionDivider />
      <StandardsGrid />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <JoinNetworkCTA />
      <FinalCTA />
    </>
  );
}
