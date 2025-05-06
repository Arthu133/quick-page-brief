
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-extension-blue">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <span className="font-bold text-lg">PageBrief</span>
          </div>
          <Button onClick={onGetStarted} className="bg-extension-blue hover:bg-extension-light-blue">
            Começar agora
          </Button>
        </div>
      </header>

      <main className="flex-1">
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

        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">1. Instale a extensão</h3>
                <p className="text-muted-foreground">Adicione o PageBrief ao seu navegador Chrome, Firefox ou Edge em apenas alguns segundos.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
                    <circle cx="6" cy="14" r="3"></circle>
                    <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">2. Clique no botão</h3>
                <p className="text-muted-foreground">Em qualquer página, clique no botão flutuante para extrair o conteúdo principal.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">3. Obtenha o resumo</h3>
                <p className="text-muted-foreground">Nossa IA identifica e resume os pontos principais em tópicos fáceis de ler.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Planos e preços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Escolha o plano que melhor atende às suas necessidades</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="pricing-card">
                <h3 className="text-xl font-bold mb-4">Plano Gratuito</h3>
                <p className="text-3xl font-bold mb-6">R$0<span className="text-base font-normal text-muted-foreground">/mês</span></p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>3 resumos por dia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Resumos em tópicos</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Sem histórico</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Sem exportação</span>
                  </li>
                </ul>
                
                <Button variant="outline" onClick={onGetStarted} className="w-full">
                  Começar Grátis
                </Button>
              </div>
              
              <div className="pricing-card pricing-card-highlight">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Plano Premium</h3>
                  <span className="bg-extension-soft-blue dark:bg-extension-blue/20 text-extension-blue px-2 py-0.5 rounded-full text-xs">Popular</span>
                </div>
                <p className="text-3xl font-bold mb-6">R$9,90<span className="text-base font-normal text-muted-foreground">/mês</span></p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Resumos ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Resumos em tópicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Histórico completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Exportação (PDF, TXT)</span>
                  </li>
                </ul>
                
                <Button onClick={onGetStarted} className="w-full bg-extension-blue hover:bg-extension-light-blue">
                  Comece com 7 dias grátis
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perguntas frequentes</h2>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-2">Como a extensão funciona?</h3>
                <p className="text-muted-foreground">A extensão extrai o conteúdo principal da página, ignorando menus e anúncios, e envia para nossa API. Nossa IA processa o texto e gera um resumo estruturado em tópicos dos pontos mais importantes.</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-2">Em quais navegadores posso usar a extensão?</h3>
                <p className="text-muted-foreground">Atualmente, suportamos Google Chrome, Microsoft Edge e todos os navegadores baseados em Chromium. Em breve, também estaremos disponíveis para Firefox.</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-2">Quais idiomas são suportados?</h3>
                <p className="text-muted-foreground">A extensão pode resumir páginas em português, inglês e espanhol. O resumo é gerado no mesmo idioma do conteúdo original.</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-2">Como cancelar a assinatura Premium?</h3>
                <p className="text-muted-foreground">Você pode cancelar sua assinatura a qualquer momento pela área "Minha conta" dentro da extensão. O cancelamento entra em vigor ao final do período faturado.</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium text-lg mb-2">Meus dados estão seguros?</h3>
                <p className="text-muted-foreground">Sim, utilizamos criptografia para proteger suas informações. Não armazenamos o conteúdo das páginas que você resume, apenas o resumo gerado e a URL para referência.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-extension-blue">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="9" y1="9" x2="10" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              <span className="font-medium">PageBrief</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Termos</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacidade</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Suporte</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contato</a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2025 PageBrief. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
