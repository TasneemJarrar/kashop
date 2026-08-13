import Categories from '../../components/categories/Categories';
import Products from '../../components/products/Products';
import Hero from '../../components/hero/Hero';
import BenefitsBar from '../../components/benefitsBar/BenefitsBar';
import Newsletter from '../../components/newsletter/Newsletter';
import FeaturedCollections from '../../components/featuredCollections/FeaturedCollections';
import Testimonials from '../../components/testimonials/Testimonials';
import FAQ from '../../components/FAQ/FAQ';

export default function Home() {
  
  return (
    <div>
      <Hero />
      <Categories />
      <Products />
      <FeaturedCollections />
      <BenefitsBar />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  )
}
