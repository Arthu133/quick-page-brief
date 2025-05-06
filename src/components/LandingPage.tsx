
import React from 'react';
import Header from './landing/Header';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import PricingSection from './landing/PricingSection';
import FaqSection from './landing/FaqSection';
import Footer from './landing/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onGetStarted={onGetStarted} />

      <main className="flex-1">
        <HeroSection onGetStarted={onGetStarted} />
        <FeaturesSection />
        <PricingSection onGetStarted={onGetStarted} />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
