
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useSummaries } from '@/hooks/useSummaries';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string | null;
  is_premium: boolean;
  created_at: string;
}

const Account = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const { checkCanCreateSummary } = useSummaries();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [dailySummaryCount, setDailySummaryCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const paymentSuccess = searchParams.get('success') === 'true';
  const paymentCanceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    if (paymentSuccess) {
      toast({
        title: "Pagamento realizado com sucesso!",
        description: "Bem-vindo ao plano PRO! Agora você tem acesso a resumos ilimitados.",
      });
      verifySubscription();
    } else if (paymentCanceled) {
      toast({
        title: "Pagamento cancelado",
        description: "O processo de pagamento foi cancelado.",
        variant: "destructive",
      });
    }
  }, [paymentSuccess, paymentCanceled]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading && !user) {
        // Redirect to login if not authenticated
        navigate('/');
      } else if (user) {
        // Load profile if authenticated
        await fetchProfile();
        await fetchDailySummaryCount();
      }
    };

    checkAuth();
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifySubscription = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('verify-subscription');
      
      if (error) {
        console.error('Error verifying subscription:', error);
        return;
      }
      
      if (data.isPremium) {
        await fetchProfile(); // Refresh profile data to get updated premium status
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    if (!user) {
      toast({
        title: "Não autenticado",
        description: "Você precisa estar conectado para fazer upgrade.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessingPayment(true);
      
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast({
          title: "Erro ao processar pagamento",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const fetchDailySummaryCount = async () => {
    if (!user) return;
    
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_summary_count')
        .select('summary_count')
        .eq('user_id', user.id)
        .eq('summary_date', currentDate)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching summary count:', error);
        return;
      }
      
      setDailySummaryCount(data?.summary_count || 0);
    } catch (error) {
      console.error('Error fetching summary count:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading || authLoading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-20 w-full mb-6" />
          
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            <span className="font-bold">PageBrief</span>
          </div>
          
          <div className="flex gap-4 items-center">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Histórico
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar para Demo
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Minha Conta</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Informações do perfil</h2>
            <p><span className="text-muted-foreground">Nome:</span> {profile?.full_name || user?.email}</p>
            <p><span className="text-muted-foreground">Email:</span> {user?.email}</p>
            <p><span className="text-muted-foreground">Membro desde:</span> {formatDate(profile?.created_at || null)}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Plano atual</h2>
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{profile?.is_premium ? 'Plano PRO' : 'Plano Gratuito'}</span>
                <span className="text-extension-blue">Ativo</span>
              </div>
              
              {!profile?.is_premium && (
                <>
                  <p className="text-sm text-muted-foreground mb-4">1 resumo por dia, sem armazenamento de histórico</p>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-2.5 rounded-full bg-extension-blue" 
                      style={{ width: `${Math.min(100, (dailySummaryCount / 1) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-2">{dailySummaryCount} de 1 resumo utilizado hoje</p>
                </>
              )}
              
              {profile?.is_premium && (
                <p className="text-sm text-muted-foreground">Resumos ilimitados e histórico completo</p>
              )}
            </div>
          </div>
          
          {!profile?.is_premium && (
            <div className="pricing-card pricing-card-highlight border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">Plano PRO</h4>
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
                  Histórico completo de resumos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Salvamento de resumos
                </li>
              </ul>
              
              <Button 
                className="w-full bg-extension-blue hover:bg-extension-light-blue"
                onClick={handleUpgrade}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? 'Processando...' : 'Upgrade para PRO'}
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            onClick={handleSignOut}
          >
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
