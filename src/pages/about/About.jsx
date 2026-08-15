import CoreValues from "../../components/coreValues/CoreValues";
import CtaBanner from "../../components/ctaBanner/CtaBanner";
import AboutHero from "../../components/hero/aboutHero";
import StatsGrid from "../../components/statsGrid/StatsGrid";
import Story from "../../components/story/Story";
import Team from "../../components/team/Team";

export default function About() {

  return <>
    <AboutHero />
    <Story />
    <StatsGrid />
    <CoreValues />
    <Team />
    <CtaBanner />

    </>
}
