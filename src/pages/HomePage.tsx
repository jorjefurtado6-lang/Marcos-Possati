import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Differentials from '../components/Differentials';
import Packages from '../components/Packages';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FinalCta from '../components/FinalCta';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#071B33] text-white flex flex-col font-serif overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      <Navbar />
      <Hero />
      <About />
      <Differentials />
      <Packages />
      <Services />
      <Portfolio />
      <Testimonials />
      <FinalCta />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
