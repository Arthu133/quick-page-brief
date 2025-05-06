// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSummary") {
    console.log("PageBrief: Recebida solicitação para resumir página");
    
    // Check if DOM is ready
    if (document.readyState === "loading") {
      console.log("PageBrief: DOM ainda carregando, aguardando conclusão");
      // Wait for DOM to be ready
      document.addEventListener("DOMContentLoaded", () => {
        processContentExtraction(sendResponse);
      });
    } else {
      // DOM is already loaded
      console.log("PageBrief: DOM já carregado, processando extração");
      processContentExtraction(sendResponse);
    }
    
    return true; // Keeps the message channel open for the async response
  }
});

// Function to handle content extraction and processing
function processContentExtraction(sendResponse) {
  // Extract content from the current page
  const content = extractPageContent();
  const pageUrl = window.location.href;
  const pageTitle = document.title;
  
  console.log(`PageBrief: Conteúdo extraído (${content.length} caracteres)`);
  
  if (!content || content.trim().length < 100) {
    console.log("PageBrief: Conteúdo insuficiente, tentando esperar mais");
    
    // Try again with a delay to allow for dynamic content to load
    setTimeout(() => {
      const delayedContent = extractPageContent();
      
      if (!delayedContent || delayedContent.trim().length < 100) {
        console.log("PageBrief: Ainda sem conteúdo suficiente após espera");
        sendResponse({ 
          error: "Conteúdo insuficiente para gerar resumo." 
        });
        return;
      }
      
      console.log(`PageBrief: Conteúdo extraído após delay (${delayedContent.length} caracteres)`);
      sendToSummaryAPI(delayedContent, pageUrl, pageTitle)
        .then(summary => sendResponse(summary))
        .catch(error => {
          console.error("Error getting summary:", error);
          sendResponse({
            error: "Erro ao gerar resumo. Tente novamente mais tarde."
          });
        });
    }, 1500); // Wait 1.5 seconds for dynamic content to load
    
    return;
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
}

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
    '#content', '#main', '[role="main"]', '.post-content', '.entry-content',
    // Additional selectors for common content containers
    '.page-content', '.body-content', '.text-content', '.story-content',
    '.story-body', '.news-article', '.blog-post', '[itemprop="articleBody"]',
    '.article-content', '.article-body', '.entry-body', '.single-content',
    '.wysiwyg', '.rich-text', '.page-body'
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
      '.navigation', '.menu', '.social', '.share', '.related', '.widget',
      'script', 'style', 'noscript', 'svg', 'iframe', '.modal', '.popup'
    ];
    
    selectorsToRemove.forEach(selector => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach(el => {
        try { el.remove(); } catch (e) { /* ignore errors */ }
      });
    });
    
    // Extract text and filter out short lines (like menu items)
    const textContent = clone.textContent || "";
    const lines = textContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 30) // Only keep substantial lines
      .join('\n\n');
    
    content = lines;
  }
  
  // If content is still insufficient, try iframes (for embedded content)
  if (content.trim().length < 100) {
    try {
      const iframes = document.querySelectorAll('iframe');
      for (const iframe of iframes) {
        try {
          if (iframe.contentDocument && iframe.contentDocument.body) {
            content += iframe.contentDocument.body.innerText + "\n\n";
          }
        } catch (e) {
          // Cross-origin iframes can't be accessed
          console.log("Could not access iframe content due to same-origin policy");
        }
      }
    } catch (e) {
      console.error("Error accessing iframe content", e);
    }
  }
  
  // Wait for the next frame to capture any delayed rendered content
  if (content.trim().length < 100) {
    // We can't use the async version in a content script directly,
    // but we note this as a potential improvement
    console.log("Content extraction: first pass insufficient, consider delayed extraction");
  }
  
  console.log(`Extracted content length: ${content.trim().length} characters`);
  return content;
}

// Initialize as soon as script loads
console.log("PageBrief: Content script carregado");

// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("PageBrief: DOMContentLoaded disparado");
});

// Add event listener for load
window.addEventListener("load", () => {
  console.log("PageBrief: Página totalmente carregada (incluindo recursos)");
});

// No need to call addFloatingButton() here as it's commented out
