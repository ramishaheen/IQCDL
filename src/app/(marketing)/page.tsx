import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ProgramTracks } from "@/components/home/ProgramTracks";
import { Features } from "@/components/home/Features";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { StandardsGrid } from "@/components/sections/StandardsGrid";
import { Pricing } from "@/components/home/Pricing";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ProgramTracks />
      <Features />
      <RoadmapTimeline />
      <StandardsGrid />
      <Pricing />
      <FinalCTA />
    </>
  );
}
