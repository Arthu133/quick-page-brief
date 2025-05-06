
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Summary {
  id: string;
  page_url: string;
  page_title?: string;
  summary: string[];
  created_at: string;
  user_notes?: string;
}

export function useSummaries() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [canCreateMore, setCanCreateMore] = useState(true);
  const { toast } = useToast();

  const checkCanCreateSummary = async () => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .rpc('can_create_summary', { user_uuid: user.id });
      
      if (error) {
        console.error('Error checking summary limit:', error);
        return false;
      }
      
      setCanCreateMore(!!data);
      return !!data;
    } catch (error) {
      console.error('Error checking summary limit:', error);
      return false;
    }
  };

  const saveSummary = async (pageTitle: string, pageUrl: string, summaryText: string[]) => {
    if (!user) {
      toast({
        title: "Não autenticado",
        description: "Você precisa estar conectado para salvar resumos.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsLoading(true);
      
      // Check if user is premium before allowing to save
      const { data: profileData } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single();
        
      if (!profileData?.is_premium) {
        toast({
          title: "Recurso Premium",
          description: "Salvar resumos é exclusivo para usuários PRO. Faça upgrade para o plano PRO por apenas R$9,90/mês.",
          variant: "destructive",
        });
        return null;
      }
      
      // If premium, proceed with saving
      const { data, error } = await supabase
        .from('summaries')
        .insert({
          user_id: user.id,
          page_title: pageTitle,
          page_url: pageUrl,
          summary: summaryText.join('\n'),
        })
        .select()
        .single();
      
      if (error) {
        toast({
          title: "Erro ao salvar",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Resumo salvo",
        description: "O resumo foi salvo com sucesso.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getSummaryHistory = async () => {
    if (!user) return [];
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Erro ao carregar histórico",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      // Transform the summary text back to array
      return data.map(item => ({
        ...item,
        summary: item.summary.split('\n')
      })) as Summary[];
    } catch (error: any) {
      toast({
        title: "Erro ao carregar histórico",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateSummaryNotes = async (summaryId: string, notes: string) => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('summaries')
        .update({ user_notes: notes })
        .eq('id', summaryId)
        .select()
        .single();
      
      if (error) {
        toast({
          title: "Erro ao atualizar notas",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Notas atualizadas",
        description: "Suas anotações foram salvas com sucesso.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar notas",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    canCreateMore,
    checkCanCreateSummary,
    saveSummary,
    getSummaryHistory,
    updateSummaryNotes
  };
}
