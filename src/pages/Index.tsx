
import React, { useState, useEffect } from 'react';
import FloatingButton from '@/components/FloatingButton';
import SidePanel from '@/components/SidePanel';
import MockBrowser from '@/components/MockBrowser';
import SampleArticle from '@/components/SampleArticle';
import LoginForm from '@/components/LoginForm';
import LandingPage from '@/components/LandingPage';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);
  const [pageTitle, setPageTitle] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  
  const togglePanel = () => {
    if (!isOpen) {
      if (!user && !authLoading && !showLogin) {
        setShowLogin(true);
      } else {
        handleSummarize();
      }
    } else {
      setIsOpen(false);
    }
  };
  
  const handleSummarize = () => {
    setIsOpen(true);
    setIsLoading(true);
    
    // Simulating API call to summarize the page
    setTimeout(() => {
      setSummary([
        "A Inteligência Artificial (IA) transformou-se de um conceito teórico para uma tecnologia presente em nosso dia a dia, com aplicações que vão desde assistentes virtuais até diagnósticos médicos.",
        "Existem três tipos principais de IA: Estreita (para tarefas específicas), Geral (semelhante à inteligência humana) e Super IA (hipotética e superior aos humanos). Atualmente, toda IA é do tipo estreita.",
        "A IA está sendo aplicada em diversos setores como saúde, finanças, transporte, varejo e educação, criando novas oportunidades e soluções para problemas complexos.",
        "Desafios significativos incluem questões de privacidade, viés algorítmico, transparência, impacto no mercado de trabalho e determinação de responsabilidade.",
        "O futuro da IA envolve avanços em aprendizado profundo, IA explicável, IA federada e abordagens híbridas, com necessidade de regulamentação para garantir benefícios à humanidade.",
        "É crucial manter uma perspectiva equilibrada sobre a IA, reconhecendo tanto seu potencial quanto suas limitações, visando aumentar o bem-estar humano e respeitar valores fundamentais."
      ]);
      setIsLoading(false);
    }, 3000);
  };
  
  const handleOnGetStarted = () => {
    setShowLanding(false);
    
    // If user is already logged in, don't show login form
    if (user) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };
  
  const handleLoginComplete = () => {
    setShowLogin(false);
  };
  
  const handleLoadContent = (title: string, url: string) => {
    setPageTitle(title);
    setPageUrl(url);
  };
  
  // Check if we should show the landing page or go straight to the demo
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('visited');
    if (hasVisitedBefore === 'true') {
      setShowLanding(false);
    }
  }, []);
  
  // Save that user has visited before
  useEffect(() => {
    if (!showLanding) {
      localStorage.setItem('visited', 'true');
    }
  }, [showLanding]);
  
  // Skip login if user is already authenticated
  useEffect(() => {
    if (user && showLogin) {
      setShowLogin(false);
    }
  }, [user, showLogin]);
  
  if (showLanding) {
    return <LandingPage onGetStarted={handleOnGetStarted} />;
  }
  
  if (showLogin) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-gray-50 dark:bg-gray-900 border-b p-4">
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
          </div>
        </div>
        <LoginForm onComplete={handleLoginComplete} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="py-4 px-6 bg-white dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-extension-blue">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <span className="font-bold">PageBrief Demo</span>
          </div>
          
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">Simulação da extensão para navegador</span>
                <button 
                  onClick={() => window.location.href = '/dashboard'} 
                  className="text-extension-blue hover:text-extension-light-blue text-sm"
                >
                  Meu histórico
                </button>
                <div 
                  className="w-8 h-8 rounded-full bg-extension-soft-blue flex items-center justify-center text-extension-blue font-medium cursor-pointer"
                  onClick={() => window.location.href = '/account'}
                >
                  {user.email ? user.email.substring(0, 2).toUpperCase() : "?"}
                </div>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">Simulação da extensão para navegador</span>
                <button onClick={() => setShowLogin(true)} className="text-extension-blue hover:text-extension-light-blue text-sm">
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-[calc(100vh-130px)]">
          <MockBrowser>
            <SampleArticle onLoadContent={handleLoadContent} />
          </MockBrowser>
        </div>
      </div>
      
      <FloatingButton onClick={togglePanel} loading={isLoading} />
      
      <SidePanel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        summary={summary}
        isLoading={isLoading}
        pageTitle={pageTitle}
        url={pageUrl}
      />
    </div>
  );
};

export default Index;
