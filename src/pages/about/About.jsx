import CoreValues from "../../components/coreValues/CoreValues";
import CtaBanner from "../../components/ctaBanner/CtaBanner";
import AboutHero from "../../components/hero/AboutHero";
import StatsGrid from "../../components/statsGrid/StatsGrid";
import Team from "../../components/team/Team";

export default function About() {

  return <>
    <AboutHero />
    <StatsGrid />
    <CoreValues />
    <Team />
    <CtaBanner />

    </>
}
