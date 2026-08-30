import CoreValues from "../../components/coreValues/CoreValues";
import CtaBanner from "../../components/ctaBanner/CtaBanner";
import AboutHero from "../../components/hero/AboutHero";
import StatsGrid from "../../components/statsGrid/StatsGrid";
import Team from "../../components/team/Team";
import AnimatedSection from "../../components/shared/AnimatedSection";

export default function About() {
  return (
    <>
      <AnimatedSection direction="up">
        <AboutHero />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <StatsGrid />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <CoreValues />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <Team />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <CtaBanner />
      </AnimatedSection>
    </>
  );
}