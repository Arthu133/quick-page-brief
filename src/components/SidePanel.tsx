
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

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
  const [currentTab, setCurrentTab] = useState('summary');

  const handleSave = () => {
    toast({
      title: "Resumo salvo!",
      description: "O resumo foi salvo no seu histórico.",
    });
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
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
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
                    <Button onClick={handleSave} className="w-full bg-extension-blue hover:bg-extension-light-blue">
                      Salvar resumo
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
            <div className="mt-4 p-4">
              <h2 className="text-xl font-semibold mb-6">Minha conta</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Plano atual</h3>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Plano Gratuito</span>
                    <span className="text-extension-blue">Ativo</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">3 resumos por dia</p>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full">
                    <div className="h-2.5 rounded-full bg-extension-blue" style={{ width: '66%' }}></div>
                  </div>
                  <p className="text-sm mt-2">2 de 3 resumos utilizados hoje</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Upgrade para Premium</h3>
                <div className="pricing-card pricing-card-highlight">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Plano Premium</h4>
                    <span className="bg-extension-soft-blue dark:bg-extension-blue/20 text-extension-blue px-2 py-0.5 rounded-full text-xs">Recomendado</span>
                  </div>
                  <p className="text-2xl font-bold mb-1">R$9,90<span className="text-base font-normal text-muted-foreground">/mês</span></p>
                  <p className="text-sm text-muted-foreground mb-4">Faturado mensalmente</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Resumos ilimitados
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Histórico completo
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Exportação de resumos (PDF, TXT)
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-extension-blue hover:bg-extension-light-blue">
                    Upgrade para Premium
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="mt-4 p-4 space-y-6">
              <h2 className="text-xl font-semibold mb-6">Configurações</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tema escuro</h3>
                    <p className="text-sm text-muted-foreground">Alterna entre tema claro e escuro</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-extension-soft-blue dark:peer-focus:ring-extension-blue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-extension-blue"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações</h3>
                    <p className="text-sm text-muted-foreground">Receba atualizações sobre novos recursos</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-extension-soft-blue dark:peer-focus:ring-extension-blue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-extension-blue"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Estilo do botão</h3>
                    <p className="text-sm text-muted-foreground">Tamanho e visibilidade do botão flutuante</p>
                  </div>
                  <div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>Padrão</option>
                      <option>Discreto</option>
                      <option>Grande</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Idioma do resumo</h3>
                    <p className="text-sm text-muted-foreground">Idioma preferido para os resumos</p>
                  </div>
                  <div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>Português</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Button variant="outline" className="w-full">
                  Salvar configurações
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SidePanel;
