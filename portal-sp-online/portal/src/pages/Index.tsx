import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LicenseTypes from "@/components/LicenseTypes";
import Requirements from "@/components/Requirements";
import News from "@/components/News";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll suave ao carregar
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible && !section.classList.contains('animate-fade-in')) {
          section.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <LicenseTypes />
        <Requirements />
        <News />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
