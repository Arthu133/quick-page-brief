
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useSummaries, Summary } from '@/hooks/useSummaries';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { getSummaryHistory, isLoading } = useSummaries();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading && !user) {
        // Redirect to login if not authenticated
        navigate('/');
      } else if (user) {
        // Load summaries if authenticated
        const history = await getSummaryHistory();
        setSummaries(history);
      }
    };

    checkAuth();
  }, [user, authLoading, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-4">
                <Skeleton className="h-5 w-4/5 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-28" />
              </CardFooter>
            </Card>
          ))}
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
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar
            </Button>
            <Button onClick={() => navigate('/account')} variant="ghost" className="text-sm">
              Conta
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Histórico de resumos</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="pb-4">
                  <Skeleton className="h-5 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : summaries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="9" y1="9" x2="10" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              <h3 className="text-lg font-medium">Nenhum resumo encontrado</h3>
              <p className="mt-2">Você ainda não criou nenhum resumo. Use a extensão para resumir páginas web.</p>
            </div>
            <Button onClick={() => navigate('/')} className="mt-4">
              Voltar para a demonstração
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <Card key={summary.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-md line-clamp-1" title={summary.page_title || summary.page_url}>
                    {summary.page_title || "Sem título"}
                  </CardTitle>
                  <CardDescription className="truncate" title={summary.page_url}>
                    {summary.page_url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {summary.summary.slice(0, 2).map((point, idx) => (
                      <p key={idx} className="text-sm line-clamp-1">
                        • {point}
                      </p>
                    ))}
                    {summary.summary.length > 2 && (
                      <p className="text-sm text-muted-foreground">+{summary.summary.length - 2} tópicos</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 text-xs text-muted-foreground">
                  {formatDate(summary.created_at)}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
