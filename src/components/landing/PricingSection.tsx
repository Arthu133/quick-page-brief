
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos e preços</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Escolha o plano que melhor atende às suas necessidades</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            title="Plano Gratuito"
            price="R$0"
            period="/mês"
            features={[
              { included: true, text: "3 resumos por dia" },
              { included: true, text: "Resumos em tópicos" },
              { included: false, text: "Sem histórico" },
              { included: false, text: "Sem exportação" }
            ]}
            buttonText="Começar Grátis"
            onButtonClick={onGetStarted}
            variant="outline"
          />
          
          <PricingCard 
            title="Plano Premium"
            price="R$9,90"
            period="/mês"
            features={[
              { included: true, text: "Resumos ilimitados" },
              { included: true, text: "Resumos em tópicos" },
              { included: true, text: "Histórico completo" },
              { included: true, text: "Exportação (PDF, TXT)" }
            ]}
            buttonText="Comece com 7 dias grátis"
            onButtonClick={onGetStarted}
            variant="default"
            highlight={true}
          />
        </div>
      </div>
    </section>
  );
};

interface PricingFeature {
  included: boolean;
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  onButtonClick: () => void;
  variant: "default" | "outline";
  highlight?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  period, 
  features, 
  buttonText, 
  onButtonClick,
  variant,
  highlight 
}) => {
  return (
    <div className={`pricing-card ${highlight ? "pricing-card-highlight" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {highlight && (
          <span className="bg-extension-soft-blue dark:bg-extension-blue/20 text-extension-blue px-2 py-0.5 rounded-full text-xs">Popular</span>
        )}
      </div>
      <p className="text-3xl font-bold mb-6">{price}<span className="text-base font-normal text-muted-foreground">{period}</span></p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.included ? (
              <CheckIcon width={16} height={16} className="text-green-500" />
            ) : (
              <XIcon width={16} height={16} className="text-muted-foreground" />
            )}
            <span className={!feature.included ? "text-muted-foreground" : ""}>{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={variant} 
        onClick={onButtonClick} 
        className={`w-full ${variant === "default" ? "bg-extension-blue hover:bg-extension-light-blue" : ""}`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingSection;
