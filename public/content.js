
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSummary") {
    // Extract content from the current page
    const content = extractPageContent();
    
    if (!content || content.length < 100) {
      sendResponse({ 
        error: "Conteúdo insuficiente para gerar resumo." 
      });
      return true;
    }
    
    // In a real extension, you would send this to your API
    // For demo purposes, we'll return mock data
    setTimeout(() => {
      sendResponse({
        summary: getMockSummary()
      });
    }, 1500); // Simulate API call delay
    
    return true; // Keeps the message channel open for the async response
  }
});

function extractPageContent() {
  // Simple content extraction
  // A real implementation would be more sophisticated
  const article = document.querySelector('article');
  
  if (article) {
    return article.innerText;
  }
  
  // Try to get main content area
  const main = document.querySelector('main');
  if (main) {
    return main.innerText;
  }
  
  // Fallback to body text, excluding common navigation elements
  const body = document.body;
  
  // Create a clone to manipulate
  const clone = body.cloneNode(true);
  
  // Remove common non-content elements
  const selectorsToRemove = [
    'header', 'nav', 'footer', '.header', '.nav', '.navbar', '.menu', 
    '.footer', '.sidebar', '.advertisement', '.ad', '.comments',
    '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]'
  ];
  
  selectorsToRemove.forEach(selector => {
    const elements = clone.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });
  
  return clone.innerText;
}

function getMockSummary() {
  // Mock summary to simulate API response
  return [
    "A Inteligência Artificial (IA) transformou-se de um conceito teórico para uma tecnologia presente em nosso dia a dia, com aplicações que vão desde assistentes virtuais até diagnósticos médicos.",
    "Existem três tipos principais de IA: Estreita (para tarefas específicas), Geral (semelhante à inteligência humana) e Super IA (hipotética e superior aos humanos). Atualmente, toda IA é do tipo estreita.",
    "A IA está sendo aplicada em diversos setores como saúde, finanças, transporte, varejo e educação, criando novas oportunidades e soluções para problemas complexos.",
    "Desafios significativos incluem questões de privacidade, viés algorítmico, transparência, impacto no mercado de trabalho e determinação de responsabilidade.",
    "O futuro da IA envolve avanços em aprendizado profundo, IA explicável, IA federada e abordagens híbridas, com necessidade de regulamentação para garantir benefícios à humanidade."
  ];
}

// Add the floating button to the page
function addFloatingButton() {
  const floatingBtn = document.createElement('div');
  floatingBtn.className = 'pagebrief-floating-btn';
  floatingBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1="9" y1="9" x2="10" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  `;
  
  // Styles
  const style = document.createElement('style');
  style.textContent = `
    .pagebrief-floating-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #3b82f6;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      transition: transform 0.2s;
    }
    
    .pagebrief-floating-btn:hover {
      transform: scale(1.05);
      background-color: #60a5fa;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(floatingBtn);
  
  // Click handler
  floatingBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  });
}

// Check if we should add the floating button
// For demo purposes, not adding it now to avoid interface clutter
// addFloatingButton();
