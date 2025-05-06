
document.addEventListener('DOMContentLoaded', () => {
  // Load saved options
  loadOptions();
  
  // Set up event listeners
  document.getElementById('save-btn').addEventListener('click', saveOptions);
  document.getElementById('reset-btn').addEventListener('click', resetOptions);
  document.getElementById('logout-btn').addEventListener('click', logout);
  document.getElementById('upgrade-btn').addEventListener('click', openUpgradePage);
  
  // Load user info
  loadUserInfo();
});

function loadOptions() {
  chrome.storage.sync.get({
    // Default values
    language: 'auto',
    maxPoints: '5',
    showFloatingBtn: true,
    autoSummarize: true,
    saveHistory: true
  }, (items) => {
    document.getElementById('language-select').value = items.language;
    document.getElementById('max-points').value = items.maxPoints;
    document.getElementById('show-floating-btn').checked = items.showFloatingBtn;
    document.getElementById('auto-summarize').checked = items.autoSummarize;
    document.getElementById('save-history').checked = items.saveHistory;
  });
}

function saveOptions() {
  const language = document.getElementById('language-select').value;
  const maxPoints = document.getElementById('max-points').value;
  const showFloatingBtn = document.getElementById('show-floating-btn').checked;
  const autoSummarize = document.getElementById('auto-summarize').checked;
  const saveHistory = document.getElementById('save-history').checked;
  
  chrome.storage.sync.set({
    language,
    maxPoints,
    showFloatingBtn,
    autoSummarize,
    saveHistory
  }, () => {
    // Show saved message
    const saveMessage = document.getElementById('save-message');
    saveMessage.classList.add('show');
    
    setTimeout(() => {
      saveMessage.classList.remove('show');
    }, 3000);
  });
}

function resetOptions() {
  chrome.storage.sync.set({
    language: 'auto',
    maxPoints: '5',
    showFloatingBtn: true,
    autoSummarize: true,
    saveHistory: true
  }, () => {
    loadOptions();
    
    // Show saved message
    const saveMessage = document.getElementById('save-message');
    saveMessage.textContent = 'Configurações restauradas para os valores padrão';
    saveMessage.classList.add('show');
    
    setTimeout(() => {
      saveMessage.textContent = 'Configurações salvas com sucesso!';
      saveMessage.classList.remove('show');
    }, 3000);
  });
}

function loadUserInfo() {
  // This would normally fetch from your backend
  // For demo purposes, we'll use mock data
  
  // Check if user is logged in
  const userString = localStorage.getItem('pagebrief_user');
  let user = null;
  
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    user = null;
  }
  
  if (!user) {
    document.getElementById('user-email').textContent = 'Não conectado';
    document.getElementById('account-type').textContent = 'Gratuito';
    document.getElementById('remaining-count').textContent = '0/3';
    document.getElementById('logout-btn').style.display = 'none';
    return;
  }
  
  // Display user info
  document.getElementById('user-email').textContent = user.email || 'usuario@exemplo.com';
  document.getElementById('account-type').textContent = user.premium ? 'Premium' : 'Gratuito';
  
  // Get usage info
  chrome.storage.local.get(['dailyUsage', 'usageLimit'], (result) => {
    const dailyUsage = result.dailyUsage || 0;
    const usageLimit = result.usageLimit || 3;
    
    document.getElementById('remaining-count').textContent = `${dailyUsage}/${usageLimit}`;
    
    // Hide upgrade button for premium users
    if (user.premium) {
      document.getElementById('upgrade-btn').style.display = 'none';
    }
  });
}

function logout() {
  // Clear user data
  localStorage.removeItem('pagebrief_user');
  
  // Reset usage
  chrome.storage.local.set({
    dailyUsage: 0,
    lastUsageDate: new Date().toDateString()
  });
  
  // Update UI
  loadUserInfo();
  
  // Show message
  const saveMessage = document.getElementById('save-message');
  saveMessage.textContent = 'Desconectado com sucesso';
  saveMessage.classList.add('show');
  
  setTimeout(() => {
    saveMessage.textContent = 'Configurações salvas com sucesso!';
    saveMessage.classList.remove('show');
  }, 3000);
}

function openUpgradePage() {
  chrome.tabs.create({ url: 'https://pagebrief.web.app/pricing' });
}
