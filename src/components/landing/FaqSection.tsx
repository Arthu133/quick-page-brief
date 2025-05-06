
import React from 'react';

const FaqSection: React.FC = () => {
  const faqItems = [
    {
      question: "Como a extensão funciona?",
      answer: "A extensão extrai o conteúdo principal da página, ignorando menus e anúncios, e envia para nossa API. Nossa IA processa o texto e gera um resumo estruturado em tópicos dos pontos mais importantes."
    },
    {
      question: "Em quais navegadores posso usar a extensão?",
      answer: "Atualmente, suportamos Google Chrome, Microsoft Edge e todos os navegadores baseados em Chromium. Em breve, também estaremos disponíveis para Firefox."
    },
    {
      question: "Quais idiomas são suportados?",
      answer: "A extensão pode resumir páginas em português, inglês e espanhol. O resumo é gerado no mesmo idioma do conteúdo original."
    },
    {
      question: "Como cancelar a assinatura Premium?",
      answer: "Você pode cancelar sua assinatura a qualquer momento pela área \"Minha conta\" dentro da extensão. O cancelamento entra em vigor ao final do período faturado."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim, utilizamos criptografia para proteger suas informações. Não armazenamos o conteúdo das páginas que você resume, apenas o resumo gerado e a URL para referência."
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perguntas frequentes</h2>
        </div>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium text-lg mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};

export default FaqSection;
