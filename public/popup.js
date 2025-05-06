
document.addEventListener('DOMContentLoaded', async () => {
  const summarizeBtn = document.getElementById('summarize-btn');
  const loadingElement = document.getElementById('loading');
  const summaryElement = document.getElementById('summary');
  const summaryPointsElement = document.getElementById('summary-points');
  const pageTitleElement = document.getElementById('page-title');
  const noContentElement = document.getElementById('no-content');
  const notLoggedElement = document.getElementById('not-logged');
  const loginBtn = document.getElementById('login-btn');
  const optionsBtn = document.querySelector('.options-btn');
  const limitInfoElement = document.getElementById('limit-info');
  
  // Check login status
  const userDetails = await checkLoginStatus();
  
  if (!userDetails) {
    loadingElement.classList.add('hidden');
    notLoggedElement.classList.remove('hidden');
    summarizeBtn.disabled = true;
  } else {
    // Update limit info
    updateLimitInfo();
  }
  
  // Button event listeners
  summarizeBtn.addEventListener('click', handleSummarize);
  loginBtn.addEventListener('click', openLogin);
  optionsBtn.addEventListener('click', openOptions);
  
  // Initial summary attempt if we're logged in
  if (userDetails) {
    handleSummarize();
  }
});

async function checkLoginStatus() {
  try {
    // First, try to get user from localStorage directly
    let userString = localStorage.getItem('supabase.auth.token');
    
    if (!userString) {
      // If not found, try to get it from any key that might contain auth data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('supabase.auth.') || key.includes('sb-'))) {
          userString = localStorage.getItem(key);
          break;
        }
      }
    }
    
    // If still not found, try opening main page in a tab to sync auth state
    if (!userString) {
      // Try to check with the main site via chrome.storage
      chrome.storage.local.get(['pagebrief_user'], (result) => {
        if (result && result.pagebrief_user) {
          return JSON.parse(result.pagebrief_user);
        }
      });
      return null;
    }
    
    // Parse user data if found
    if (userString) {
      try {
        const parsedData = JSON.parse(userString);
        // Save to chrome storage for consistency
        chrome.storage.local.set({ 'pagebrief_user': userString });
        return parsedData;
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    return null;
  } catch (e) {
    console.error('Error checking login status:', e);
    return null;
  }
}

async function updateLimitInfo() {
  // Get usage from storage
  chrome.storage.local.get(['dailyUsage', 'usageLimit'], (result) => {
    const dailyUsage = result.dailyUsage || 0;
    const usageLimit = result.usageLimit || 3; // Free tier limit
    
    document.getElementById('limit-info').textContent = `Resumos hoje: ${dailyUsage}/${usageLimit}`;
    
    // Disable summarize button if limit reached
    if (dailyUsage >= usageLimit) {
      document.getElementById('summarize-btn').disabled = true;
    }
  });
}

async function handleSummarize() {
  // Show loading state
  const loadingElement = document.getElementById('loading');
  const summaryElement = document.getElementById('summary');
  const noContentElement = document.getElementById('no-content');
  
  loadingElement.classList.remove('hidden');
  summaryElement.classList.add('hidden');
  noContentElement.classList.add('hidden');
  
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) {
    showError("Não foi possível acessar a aba atual.");
    return;
  }
  
  try {
    // Try to extract content with a short delay to allow for dynamic content loading
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectDelayedExtractor
    }).then(() => {
      // Now send message to content script after the delay function was injected
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, { action: "getSummary" }, (response) => {
          if (chrome.runtime.lastError) {
            // Content script not ready or cannot establish connection
            showError("Não foi possível conectar com a página. Tente recarregá-la.");
            return;
          }
          
          if (!response || response.error) {
            showError(response?.error || "Erro ao gerar resumo.");
            return;
          }
          
          if (!response.summary || response.summary.length === 0) {
            loadingElement.classList.add('hidden');
            noContentElement.classList.remove('hidden');
            return;
          }
          
          // Display the summary
          displaySummary(tab.title, response.summary);
          
          // Update usage count
          updateUsageCount();
          
          // Show premium message if returned in response
          if (response.message) {
            const summaryContainer = document.querySelector('.summary-container');
            const premiumMessage = document.createElement('div');
            premiumMessage.className = 'mt-4 p-2 bg-blue-50 text-blue-700 text-sm rounded';
            premiumMessage.textContent = response.message;
            summaryContainer.appendChild(premiumMessage);
          }
        });
      }, 300); // Short delay to ensure content script has time to process
    }).catch(err => {
      console.error("Script injection error:", err);
      showError("Erro ao analisar a página.");
    });
  } catch (error) {
    console.error("Error in handleSummarize:", error);
    showError("Ocorreu um erro ao tentar resumir a página.");
  }
}

// This function will be injected into the page to help with dynamic content extraction
function injectDelayedExtractor() {
  // We'll set up a MutationObserver to detect content changes
  // This is a helper function that will be injected into the page context
  if (!window._pageBriefObserverInitialized) {
    window._pageBriefObserverInitialized = true;
    
    // Create observer instance
    const observer = new MutationObserver((mutations) => {
      // When mutations happen, we'll just set a flag that content was updated
      window._pageBriefContentUpdated = true;
    });
    
    // Observe the entire document for changes in DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: true
    });
    
    console.log("PageBrief: Content observer initialized");
  }
}

function displaySummary(pageTitle, summaryPoints) {
  const loadingElement = document.getElementById('loading');
  const summaryElement = document.getElementById('summary');
  const summaryPointsElement = document.getElementById('summary-points');
  const pageTitleElement = document.getElementById('page-title');
  
  // Set page title
  pageTitleElement.textContent = pageTitle;
  
  // Clear existing points
  summaryPointsElement.innerHTML = '';
  
  // Add new points
  summaryPoints.forEach(point => {
    const li = document.createElement('li');
    li.textContent = point;
    summaryPointsElement.appendChild(li);
  });
  
  // Show summary
  loadingElement.classList.add('hidden');
  summaryElement.classList.remove('hidden');
}

function showError(message) {
  const loadingElement = document.getElementById('loading');
  const noContentElement = document.getElementById('no-content');
  
  loadingElement.classList.add('hidden');
  noContentElement.classList.remove('hidden');
  noContentElement.querySelector('p').textContent = message;
}

function updateUsageCount() {
  chrome.storage.local.get(['dailyUsage', 'lastUsageDate'], (result) => {
    const today = new Date().toDateString();
    const lastUsageDate = result.lastUsageDate || '';
    
    let dailyUsage = result.dailyUsage || 0;
    
    // Reset counter if it's a new day
    if (lastUsageDate !== today) {
      dailyUsage = 1;
    } else {
      dailyUsage += 1;
    }
    
    // Update storage
    chrome.storage.local.set({ 
      dailyUsage: dailyUsage,
      lastUsageDate: today
    }, () => {
      // Update the UI
      updateLimitInfo();
    });
  });
}

function openLogin() {
  // Open login page in a new tab
  chrome.tabs.create({ url: 'https://quick-page-brief.lovable.app' });
}

function openOptions() {
  chrome.runtime.openOptionsPage();
}
