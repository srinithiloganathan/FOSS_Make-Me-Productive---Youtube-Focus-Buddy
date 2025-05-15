document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('toggleFilter');
  const filteredCount = document.getElementById('filteredCount');
  const educationalCount = document.getElementById('educationalCount');
  const productivityScore = document.getElementById('productivityScore');

  // Load the current setting from storage
  chrome.storage.sync.get(["distractionFilterEnabled"], (result) => {
    toggle.checked = !!result.distractionFilterEnabled;
  });

  // Listen for statistics updates from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'statsUpdate') {
      const stats = message.stats;
      filteredCount.textContent = stats.filteredCount;
      educationalCount.textContent = stats.educationalCount;
      
      // Calculate productivity score
      const totalVideos = stats.filteredCount + stats.educationalCount;
      const score = totalVideos > 0 
        ? Math.round((stats.educationalCount / totalVideos) * 100) 
        : 100;
      
      productivityScore.textContent = `${score}%`;
    }
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
