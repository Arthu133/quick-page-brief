
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// Mock function to generate summaries
function generateSummary(content: string, url: string): string[] {
  // In a real implementation, this would call OpenAI or another AI service
  console.log(`Generating summary for URL: ${url}`);
  console.log(`Content length: ${content.length} characters`);
  
  // For now, return a mock summary based on content length
  if (content.includes('inteligência artificial') || content.includes('AI')) {
    return [
      "A Inteligência Artificial (IA) evoluiu de um conceito teórico para uma tecnologia onipresente em nossa rotina diária.",
      "Existem três classificações principais: IA Estreita (específica), IA Geral (similar à humana) e Super IA (hipotética).",
      "Aplicações abrangem saúde, finanças, transporte, comércio e educação, resolvendo problemas complexos.",
      "Desafios incluem privacidade, viés algorítmico, transparência e impacto no mercado de trabalho.",
      "O desenvolvimento futuro foca em deep learning, explicabilidade, federação de dados e abordagens híbridas.",
      "É essencial manter uma visão equilibrada, reconhecendo benefícios e limitações da tecnologia."
    ];
  } else {
    return [
      "Este é um resumo gerado automaticamente do conteúdo da página.",
      "Em uma implementação real, utilizaríamos um modelo de linguagem como GPT para gerar resumos detalhados.",
      "O resumo destacaria os pontos principais do texto, mantendo o contexto e as informações mais relevantes.",
      "Para páginas maiores, o resumo seria proporcional ao tamanho do conteúdo original.",
      "Esta funcionalidade permitiria uma rápida compreensão do texto sem necessidade de ler todo o conteúdo.",
      "Ideal para pesquisas, revisão de artigos e aprendizado eficiente."
    ];
  }
}

// Check if the user has reached their daily limit
async function checkUserLimit(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('can_create_summary', { 
      user_uuid: userId 
    });
    
    if (error) {
      console.error('Error checking user limit:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Exception checking user limit:', error);
    return false;
  }
}

// Update the daily summary count
async function updateSummaryCount(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if there's an entry for today
  const { data, error } = await supabase
    .from('daily_summary_count')
    .select('*')
    .eq('user_id', userId)
    .eq('summary_date', today)
    .maybeSingle();
  
  if (error) {
    console.error('Error checking summary count:', error);
    return;
  }
  
  if (data) {
    // Update existing entry
    await supabase
      .from('daily_summary_count')
      .update({ summary_count: data.summary_count + 1 })
      .eq('user_id', userId)
      .eq('summary_date', today);
  } else {
    // Create new entry
    await supabase
      .from('daily_summary_count')
      .insert({
        user_id: userId,
        summary_date: today,
        summary_count: 1
      });
  }
}

// Save the summary to the database
async function saveSummary(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  url: string,
  title: string,
  summary: string[]
): Promise<Record<string, any> | null> {
  try {
    // Check if user is premium before saving
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error('Error checking premium status:', profileError);
      return null;
    }
    
    // Only premium users can save summaries
    if (!profileData.is_premium) {
      console.log('User is not premium, not saving summary');
      return null;
    }
    
    const { data, error } = await supabase
      .from('summaries')
      .insert({
        user_id: userId,
        page_url: url,
        page_title: title,
        summary: summary.join('\n')
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error saving summary:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception saving summary:', error);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { headers: corsHeaders, status: 405 }
      );
    }
    
    // Get request body
    const body = await req.json();
    const { content, url, title, auth } = body;
    
    if (!content || !url) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: corsHeaders, status: 400 }
      );
    }
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify authentication if provided
    let userId = null;
    let isPremium = false;
    
    if (auth?.access_token) {
      const { data, error } = await supabase.auth.getUser(auth.access_token);
      
      if (error) {
        console.error('Auth error:', error);
      } else if (data?.user) {
        userId = data.user.id;
        
        // Get user premium status
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', userId)
          .single();
          
        isPremium = !!profileData?.is_premium;
        
        // Check if user has reached their limit (if not premium)
        if (!isPremium) {
          const canCreate = await checkUserLimit(supabase, userId);
          
          if (!canCreate) {
            return new Response(
              JSON.stringify({ 
                error: 'Daily limit reached',
                message: 'Você atingiu seu limite diário de 1 resumo. Faça upgrade para o plano PRO por apenas R$9,90/mês para resumos ilimitados.'
              }),
              { headers: corsHeaders, status: 403 }
            );
          }
        }
      }
    }
    
    // Generate summary
    const summary = generateSummary(content, url);
    
    // Save summary if authenticated and premium
    let saved = false;
    if (userId) {
      // Update summary count for non-premium users
      if (!isPremium) {
        await updateSummaryCount(supabase, userId);
      }
      
      // Only save if premium
      if (isPremium) {
        const savedSummary = await saveSummary(supabase, userId, url, title || url, summary);
        saved = !!savedSummary;
      }
    }
    
    // Return the summary
    return new Response(
      JSON.stringify({ 
        summary, 
        saved, 
        isPremium,
        message: isPremium ? null : 'Atualize para o plano PRO para salvar resumos e desbloquear resumos ilimitados.'
      }),
      { headers: corsHeaders, status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { headers: corsHeaders, status: 500 }
    );
  }
});
