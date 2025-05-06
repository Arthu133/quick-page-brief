
import React, { useEffect, useState } from 'react';

interface SampleArticleProps {
  onLoadContent: (title: string, url: string) => void;
}

const SampleArticle: React.FC<SampleArticleProps> = ({ onLoadContent }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  useEffect(() => {
    onLoadContent(
      "Inteligência Artificial: O Presente e Futuro da Tecnologia",
      "https://exemplo.com/artigo-inteligencia-artificial"
    );
    
    const readingTimer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 60000); // atualiza a cada minuto
    
    return () => clearInterval(readingTimer);
  }, [onLoadContent]);
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Inteligência Artificial: O Presente e Futuro da Tecnologia</h1>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-extension-soft-purple"></div>
          <span>Maria Silva</span>
        </div>
        <div>16 de maio de 2025 • {timeElapsed > 0 ? `${timeElapsed} min de leitura` : "10 min de leitura"}</div>
      </div>
      
      <div>
        <p className="mb-4">
          A Inteligência Artificial (IA) transformou-se de um conceito de ficção científica em uma tecnologia que permeia 
          nossa vida cotidiana. De assistentes virtuais a carros autônomos, algoritmos de recomendação e diagnósticos médicos, 
          a IA está revolucionando diversos setores e criando novas possibilidades para resolver problemas complexos.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">O que é Inteligência Artificial?</h2>
        <p className="mb-4">
          A Inteligência Artificial refere-se ao desenvolvimento de sistemas computacionais capazes de realizar tarefas 
          que normalmente exigiriam inteligência humana. Isto inclui aprendizagem, raciocínio, resolução de problemas, 
          percepção e compreensão da linguagem natural. O objetivo da IA não é necessariamente replicar a inteligência 
          humana, mas criar sistemas que possam processar grandes volumes de dados e identificar padrões para auxiliar 
          em tarefas específicas.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Principais Tipos de IA</h2>
        <p className="mb-4">
          Existem diferentes classificações para os tipos de IA. Uma das mais comuns divide a IA em três categorias:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>IA Estreita ou Fraca:</strong> Projetada para executar uma tarefa específica, como reconhecimento facial ou assistentes virtuais.</li>
          <li><strong>IA Geral:</strong> Capaz de aprender e aplicar conhecimentos em diferentes domínios, semelhante à inteligência humana.</li>
          <li><strong>Super IA:</strong> Ainda hipotética, seria capaz de superar a inteligência humana em praticamente todos os aspectos.</li>
        </ul>
        <p className="mb-4">
          Atualmente, toda a IA desenvolvida e implementada é do tipo estreita, focada em resolver problemas específicos.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Aplicações Práticas da IA</h2>
        <p className="mb-4">
          A IA está sendo aplicada em diversos setores:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Saúde:</strong> Diagnósticos precisos, descoberta de medicamentos e medicina personalizada.</li>
          <li><strong>Finanças:</strong> Detecção de fraudes, algoritmos de trading e avaliação de riscos.</li>
          <li><strong>Transporte:</strong> Veículos autônomos, otimização de rotas e manutenção preditiva.</li>
          <li><strong>Varejo:</strong> Recomendações personalizadas, gerenciamento de estoque e atendimento ao cliente.</li>
          <li><strong>Educação:</strong> Tutores virtuais adaptáveis e avaliações personalizadas.</li>
        </ul>
        <p className="mb-4">
          Estas aplicações demonstram como a IA está transformando processos e criando valor em diferentes indústrias.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Desafios e Considerações Éticas</h2>
        <p className="mb-4">
          Junto com os avanços, a IA traz desafios significativos:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Privacidade:</strong> O uso de dados pessoais para treinar algoritmos levanta questões sobre consentimento e segurança.</li>
          <li><strong>Viés Algorítmico:</strong> Sistemas de IA podem perpetuar ou amplificar preconceitos existentes nos dados de treinamento.</li>
          <li><strong>Transparência:</strong> Muitos sistemas de IA funcionam como "caixas pretas", dificultando a compreensão de suas decisões.</li>
          <li><strong>Impacto no Trabalho:</strong> A automação pode eliminar certos tipos de empregos, necessitando adaptação da força de trabalho.</li>
          <li><strong>Responsabilidade:</strong> Determinar quem é responsável por decisões tomadas por sistemas autônomos.</li>
        </ul>
        <p className="mb-4">
          Estes desafios exigem uma abordagem multidisciplinar, envolvendo não apenas especialistas em tecnologia, 
          mas também formuladores de políticas, filósofos, sociólogos e representantes da sociedade civil.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">O Futuro da IA</h2>
        <p className="mb-4">
          O campo da IA continua evoluindo rapidamente, com avanços em áreas como:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Aprendizado Profundo:</strong> Redes neurais cada vez mais complexas, capazes de aprender com menos dados.</li>
          <li><strong>IA Explicável:</strong> Sistemas que podem fornecer justificativas compreensíveis para suas decisões.</li>
          <li><strong>IA Federada:</strong> Treinamento de algoritmos sem centralizar dados sensíveis.</li>
          <li><strong>IA Híbrida:</strong> Combinação de diferentes abordagens de IA para superar limitações específicas.</li>
        </ul>
        <p className="mb-4">
          Enquanto pesquisadores continuam expandindo as fronteiras do possível, empresas e governos estão desenvolvendo 
          estruturas regulatórias para garantir que o desenvolvimento da IA beneficie a humanidade e minimize riscos.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Conclusão</h2>
        <p className="mb-4">
          A Inteligência Artificial representa uma das mais transformadoras tecnologias do nosso tempo. 
          Seu potencial para resolver problemas complexos e criar novas oportunidades é imenso, mas também 
          traz desafios significativos que precisam ser abordados de forma proativa e colaborativa.
        </p>
        <p>
          À medida que continuamos a desenvolver e implementar sistemas de IA, é crucial manter uma perspectiva 
          equilibrada, reconhecendo tanto o potencial quanto as limitações desta tecnologia. O objetivo final 
          deve ser garantir que a IA seja desenvolvida e utilizada de maneira que aumente o bem-estar humano e 
          respeite valores fundamentais como privacidade, autonomia e equidade.
        </p>
      </div>
    </div>
  );
};

export default SampleArticle;
