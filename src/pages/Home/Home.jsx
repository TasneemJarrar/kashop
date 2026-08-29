import Categories from '../../components/categories/Categories';
import Products from '../../components/products/Products';
import Hero from '../../components/hero/Hero';
import BenefitsBar from '../../components/benefitsBar/BenefitsBar';
import Newsletter from '../../components/newsletter/Newsletter';
import FeaturedCollections from '../../components/featuredCollections/FeaturedCollections';
import Testimonials from '../../components/testimonials/Testimonials';
import FAQ from '../../components/FAQ/FAQ';
import AnimatedSection from '../../components/shared/AnimatedSection';

export default function Home() {
  return (
    <div>
      <AnimatedSection direction="up">
        <Hero />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <Categories />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <Products />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <FeaturedCollections />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <BenefitsBar />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <FAQ />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.05}>
        <Newsletter />
      </AnimatedSection>
    </div>
  );
}