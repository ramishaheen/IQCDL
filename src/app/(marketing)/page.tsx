import { Hero } from "@/components/home/Hero";
import { ProgramTracks } from "@/components/home/ProgramTracks";
import { Features } from "@/components/home/Features";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { StandardsGrid } from "@/components/sections/StandardsGrid";
import { Pricing } from "@/components/home/Pricing";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionDivider } from "@/components/visuals/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
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
      <FinalCTA />
    </>
  );
}
