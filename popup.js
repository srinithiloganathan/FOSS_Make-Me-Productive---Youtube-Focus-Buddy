document.addEventListener('DOMContentLoaded', function () {
  const loaderContainer = document.getElementById('loaderContainer');
  const loaderMessage = loaderContainer.querySelector('.loader-message');
  
  // Array of inspirational messages
  const messages = [
    "Loading your productivity insights...",
    "Preparing to boost your focus...",
    "Getting your learning stats ready...",
    "Making YouTube work better for you...",
    "Calculating your educational progress..."
  ];
  
  // Show random message
  loaderMessage.textContent = messages[Math.floor(Math.random() * messages.length)];

  const toggle = document.getElementById('toggleFilter');
  const filteredCount = document.getElementById('filteredCount');
  const educationalCount = document.getElementById('educationalCount');
  const productivityScore = document.getElementById('productivityScore');
  const totalVideos = document.getElementById('totalVideos');
  const educationalTime = document.getElementById('educationalTime');
  const educationalProgress = document.getElementById('educationalProgress');
  const educationalPercentage = document.getElementById('educationalPercentage');

  // Set a timeout to ensure loader shows for at least 500ms
  const minimumLoaderTime = new Promise(resolve => setTimeout(resolve, 500));

  // Load the current setting and stats
  Promise.all([
    new Promise(resolve => chrome.storage.sync.get(['distractionFilterEnabled'], resolve)),
    new Promise(resolve => chrome.storage.local.get(['videoStats'], resolve)),
    minimumLoaderTime
  ]).then(([settingsResult, statsResult]) => {
    // Update toggle state
    toggle.checked = !!settingsResult.distractionFilterEnabled;
    
    // Update stats display
    if (statsResult.videoStats) {
      const stats = statsResult.videoStats;
      filteredCount.textContent = stats.filteredCount || 0;
      educationalCount.textContent = stats.educationalCount || 0;
      
      const totalVideos = (stats.filteredCount || 0) + (stats.educationalCount || 0);
      const score = totalVideos > 0 
        ? Math.round((stats.educationalCount / totalVideos) * 100) 
        : 100;
      
      productivityScore.textContent = `${score}%`;
    }
    
    // Hide loader
    loaderContainer.style.opacity = '0';
    setTimeout(() => {
      loaderContainer.style.display = 'none';
    }, 200);
  }).catch(error => {
    console.error('Error loading stats:', error);
    // Hide loader even if there's an error
    loaderContainer.style.display = 'none';
  });

  // Listen for changes to the toggle switch
  toggle.addEventListener("change", () => {
    // Save the new setting
    chrome.storage.sync.set({ distractionFilterEnabled: toggle.checked }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // Reload the current tab to apply the changes
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });

  // Listen for storage changes to update stats in real time
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.focusFilterStats) {
      const stats = changes.focusFilterStats.newValue || { filtered: 0, educational: 0, total: 0, productivity: 0 };
      filteredCount.textContent = stats.filtered;
      educationalCount.textContent = stats.educational;
      productivityScore.textContent = stats.productivity + '%';
    }
  });
});

// Update the message listener to handle stats updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'statsUpdate' && message.stats) {
    const stats = message.stats;
    
    // Update existing stats
    filteredCount.textContent = stats.filteredCount || 0;
    educationalCount.textContent = stats.educationalCount || 0;
    totalVideos.textContent = stats.totalVideos || 0;
    
    // Update educational time
    const minutes = Math.round(stats.watchTime?.educational / 60) || 0;
    educationalTime.textContent = `${minutes} min`;
    
    // Update educational percentage
    educationalProgress.style.width = `${stats.educationalPercentage}%`;
    educationalPercentage.textContent = `${stats.educationalPercentage}%`;
    
    // Update productivity score
    productivityScore.textContent = `${stats.productivityScore}%`;
  }
});
