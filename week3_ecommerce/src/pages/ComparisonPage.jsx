import Header from '../components/Header';
import Hero from '../components/Hero';
import ComparisonTable from '../components/ComparisonTable';
import FeaturesBanner from '../components/FeaturesBanner';
import Footer from '../components/Footer';

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <Hero />
      <ComparisonTable />
      <FeaturesBanner />
      <Footer />
    </div>
  );
}