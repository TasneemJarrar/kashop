import Categories from '../../components/categories/Categories';
import Products from '../../components/products/Products';
import Hero from '../../components/hero/Hero';
import BenefitsBar from '../../components/benefitsBar/BenefitsBar';
import Newsletter from '../../components/newsletter/Newsletter';

export default function Home() {
  
  return (
    <div>
      <Hero />
      <Categories />
      <Products />
      <BenefitsBar />
      <Newsletter />
    </div>
  )
}
