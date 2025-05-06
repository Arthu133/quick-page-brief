
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Resumos inteligentes para qualquer página web
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Economize tempo com resumos em tópicos gerados por IA. Extraia os pontos principais de qualquer artigo ou página com um único clique.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onGetStarted} size="lg" className="bg-extension-blue hover:bg-extension-light-blue">
            Instalar a extensão
          </Button>
          <Button variant="outline" size="lg">
            Ver demonstração
          </Button>
        </div>

        <div className="mt-12 border rounded-xl overflow-hidden shadow-xl">
          <img 
            src="https://via.placeholder.com/1200x600?text=Screenshot+da+Extensão" 
            alt="PageBrief em ação" 
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
