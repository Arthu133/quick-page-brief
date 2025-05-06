// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSummary") {
    // Extract content from the current page
    const content = extractPageContent();
    const pageUrl = window.location.href;
    const pageTitle = document.title;
    
    if (!content || content.trim().length < 100) {
      sendResponse({ 
        error: "Conteúdo insuficiente para gerar resumo." 
      });
      return true;
    }
    
    // Send the content to our Supabase function to get a summary
    sendToSummaryAPI(content, pageUrl, pageTitle)
      .then(summary => {
        sendResponse(summary);
      })
      .catch(error => {
        console.error("Error getting summary:", error);
        sendResponse({
          error: "Erro ao gerar resumo. Tente novamente mais tarde."
        });
      });
    
    return true; // Keeps the message channel open for the async response
  }
});

async function sendToSummaryAPI(content, url, title) {
  try {
    // Prepare user auth data if available
    let authData = null;
    try {
      // Try to get auth token from localStorage
      let userString = localStorage.getItem('supabase.auth.token');
      
      if (!userString) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('supabase.auth.') || key.includes('sb-'))) {
            userString = localStorage.getItem(key);
            break;
          }
        }
      }
      
      if (userString) {
        const parsedData = JSON.parse(userString);
        if (parsedData.access_token || (parsedData.session && parsedData.session.access_token)) {
          authData = {
            access_token: parsedData.access_token || parsedData.session.access_token
          };
        }
      }
    } catch (e) {
      console.error("Error parsing auth data:", e);
    }
    
    // Call the summary API
    const response = await fetch("https://wguqcjcpahisfcjqalhu.supabase.co/functions/v1/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The anon key is public and safe to use in client-side code
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndXFjamNwYWhpc2ZjanFhbGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTc1NzgsImV4cCI6MjA2MjEzMzU3OH0.sQ2beZHSbX_eBKrG6doEq5owJagFH3TaWqxeM1SEobo"
      },
      body: JSON.stringify({
        content,
        url,
        title,
        auth: authData
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      return { 
        error: errorData.message || "Erro ao gerar resumo." 
      };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in sendToSummaryAPI:", error);
    return { 
      error: "Erro ao conectar com o serviço de resumo." 
    };
  }
}

function extractPageContent() {
  // Enhanced content extraction function
  let content = "";
  
  // Try different content strategies in order of preference
  const selectors = [
    'article', 'main', '.content', '.post', '.entry', '.article',
    '#content', '#main', '[role="main"]', '.post-content', '.entry-content'
  ];
  
  // Try each selector
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      // Concatenate text from all matching elements
      for (const element of elements) {
        content += element.innerText + "\n\n";
      }
      
      if (content.trim().length > 100) {
        console.log(`Found content using selector: ${selector}`);
        return content;
      }
    }
  }
  
  // If no content found with selectors, get all paragraphs
  if (content.trim().length < 100) {
    const paragraphs = document.querySelectorAll('p');
    if (paragraphs.length > 3) {
      for (const p of paragraphs) {
        // Skip very short paragraphs that might be buttons or labels
        if (p.innerText.trim().length > 20) {
          content += p.innerText + "\n\n";
        }
      }
    }
  }
  
  // If still no content, try getting text directly from body
  if (content.trim().length < 100) {
    // Create a clone to manipulate
    const clone = document.body.cloneNode(true);
    
    // Remove common non-content elements
    const selectorsToRemove = [
      'header', 'nav', 'footer', '.header', '.nav', '.navbar', '.menu', 
      '.footer', '.sidebar', '.advertisement', '.ad', '.comments', 'aside',
      '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
      '.navigation', '.menu', '.social', '.share', '.related', '.widget'
    ];
    
    selectorsToRemove.forEach(selector => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach(el => {
        try { el.remove(); } catch (e) { /* ignore errors */ }
      });
    });
    
    content = clone.textContent;
  }
  
  console.log(`Extracted content length: ${content.trim().length} characters`);
  return content;
}

// The getMockSummary function can be removed as we're now using the real OpenAI API
// function getMockSummary() {
//   // Mock summary to simulate API response
//   return [
//     "A Inteligência Artificial (IA) transformou-se de um conceito teórico para uma tecnologia presente em nosso dia a dia, com aplicações que vão desde assistentes virtuais até diagnósticos médicos.",
//     "Existem três tipos principais de IA: Estreita (para tarefas específicas), Geral (semelhante à inteligência humana) e Super IA (hipotética e superior aos humanos). Atualmente, toda IA é do tipo estreita.",
//     "A IA está sendo aplicada em diversos setores como saúde, finanças, transporte, varejo e educação, criando novas oportunidades e soluções para problemas complexos.",
//     "Desafios significativos incluem questões de privacidade, viés algorítmico, transparência, impacto no mercado de trabalho e determinação de responsabilidade.",
//     "O futuro da IA envolve avanços em aprendizado profundo, IA explicável, IA federada e abordagens híbridas, com necessidade de regulamentação para garantir benefícios à humanidade."
//   ];
// }

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
