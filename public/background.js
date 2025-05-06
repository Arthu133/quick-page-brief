
// Listen for installation
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    // First installation
    // Initialize storage
    chrome.storage.local.set({
      dailyUsage: 0,
      lastUsageDate: new Date().toDateString(),
      usageLimit: 3 // Free tier limit
    });
    
    // Open onboarding page
    chrome.tabs.create({ url: 'https://pagebrief.web.app/welcome' });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkLoginStatus') {
    // This would normally check with your backend
    sendResponse({ loggedIn: true }); // For demo purposes
  }
});
