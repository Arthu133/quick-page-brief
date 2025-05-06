
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useSummaries } from '@/hooks/useSummaries';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string[] | null;
  isLoading: boolean;
  pageTitle: string;
  url: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
  isOpen, 
  onClose, 
  summary, 
  isLoading, 
  pageTitle,
  url
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveSummary, isLoading: isSaving } = useSummaries();
  const [currentTab, setCurrentTab] = useState('summary');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!summary) return;
    
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar conectado para salvar resumos.",
        variant: "destructive",
      });
      return;
    }
    
    const result = await saveSummary(pageTitle, url, summary);
    
    if (result) {
      toast({
        title: "Resumo salvo!",
        description: "O resumo foi salvo no seu histórico.",
      });
    }
  };

  // Reset to summary tab when panel opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTab('summary');
    }
  }, [isOpen]);

  return (
    <div
      className={`side-panel ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="side-panel-header">
        <div className="text-lg font-medium">PageBrief</div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>

      <div className="p-4 pt-0">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="summary">Resumo</TabsTrigger>
            <TabsTrigger value="account" onClick={() => user ? navigate('/account') : null}>
              Conta
            </TabsTrigger>
            <TabsTrigger value="history" onClick={() => user ? navigate('/dashboard') : null}>
              Histórico
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="h-[calc(100vh-150px)]">
            <div className="mb-4 mt-4">
              <h2 className="text-lg font-semibold line-clamp-2" title={pageTitle}>{pageTitle}</h2>
              <p className="text-sm text-muted-foreground truncate" title={url}>{url}</p>
            </div>
            
            <div className="summary-container">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-24 w-full mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-24 w-full mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-24 w-full" />
                </>
              ) : summary && summary.length > 0 ? (
                <>
                  <h3 className="font-medium mb-4">Principais pontos:</h3>
                  <ul>
                    {summary.map((point, index) => (
                      <li key={index} className="summary-item">
                        <p>{point}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="fixed bottom-0 right-0 p-4 w-96 bg-white dark:bg-extension-dark border-t border-gray-200 dark:border-gray-800">
                    <Button 
                      onClick={handleSave} 
                      className="w-full bg-extension-blue hover:bg-extension-light-blue"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Salvando...' : 'Salvar resumo'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhum resumo disponível.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="account">
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {user ? 'Redirecionando...' : 'Faça login para acessar sua conta.'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                {user ? 'Redirecionando...' : 'Faça login para ver seu histórico de resumos.'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SidePanel;
