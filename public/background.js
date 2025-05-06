
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
    chrome.tabs.create({ url: 'https://quick-page-brief.lovable.app' });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkLoginStatus') {
    // This would normally check with your backend
    sendResponse({ loggedIn: true }); // For demo purposes
  }
  
  // Listen for auth state changes
  if (message.action === 'authStateChanged') {
    // Store user data in chrome.storage for the popup to access
    chrome.storage.local.set({ 'pagebrief_user': message.user });
    sendResponse({ success: true });
  }
});

// Check for Supabase auth in localStorage periodically and sync to chrome.storage
function syncAuthState() {
  try {
    // Check any key that might contain auth data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('supabase.auth.') || key.includes('sb-'))) {
        const userData = localStorage.getItem(key);
        if (userData) {
          chrome.storage.local.set({ 'pagebrief_user': userData });
          break;
        }
      }
    }
  } catch (e) {
    console.error('Error syncing auth state:', e);
  }
}

// Run initial sync
syncAuthState();

// Set up periodic check (every minute)
setInterval(syncAuthState, 60000);
