
import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>}
            title="1. Instale a extensão"
            description="Adicione o PageBrief ao seu navegador Chrome, Firefox ou Edge em apenas alguns segundos."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
              <circle cx="6" cy="14" r="3"></circle>
              <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
            </svg>}
            title="2. Clique no botão"
            description="Em qualquer página, clique no botão flutuante para extrair o conteúdo principal."
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>}
            title="3. Obtenha o resumo"
            description="Nossa IA identifica e resume os pontos principais em tópicos fáceis de ler."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="feature-icon-container">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeaturesSection;
