
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{
    error: any;
    data: any;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: any;
    data: any;
  }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup helper
    const cleanupAuthState = () => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      Object.keys(sessionStorage || {}).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Update state synchronously
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Log auth events for debugging
        console.log('Auth state changed:', event, currentSession?.user?.id);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Clean up existing state before sign in
      const cleanupAuthState = () => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
        Object.keys(sessionStorage || {}).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            sessionStorage.removeItem(key);
          }
        });
      };
      
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          // Não usar redirectTo para evitar problemas de redirecionamento
        }
      });
      
      if (error) {
        toast({
          title: "Erro ao entrar",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.user) {
        toast({
          title: "Bem-vindo de volta!",
          description: "Login realizado com sucesso.",
        });
      }
      
      return { data, error };
    } catch (error: any) {
      toast({
        title: "Erro ao entrar",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          // Não usar redirectTo para evitar problemas de redirecionamento
        },
      });

      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Conta criada com sucesso!",
          description: "Confira seu email para verificar sua conta.",
        });
      }

      return { data, error };
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      const cleanupAuthState = () => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
        Object.keys(sessionStorage || {}).forEach((key) => {
          if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
            sessionStorage.removeItem(key);
          }
        });
      };
      
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast({
        title: "Desconectado",
        description: "Você saiu da sua conta com sucesso.",
      });
      
      // Ao invés de redirecionar para uma URL específica, voltamos para a página atual
      // ou para a página inicial da aplicação
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        // Se já estiver na página inicial, apenas force um reload para limpar o estado
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
