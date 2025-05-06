
import React from 'react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;
