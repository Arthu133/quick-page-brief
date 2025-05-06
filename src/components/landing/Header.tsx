
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onGetStarted: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted }) => {
  return (
    <header className="border-b px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
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
  );
};

export default Header;
