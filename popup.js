document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('toggleFilter');

  // Load the current setting from storage
  chrome.storage.sync.get(["distractionFilterEnabled"], (result) => {
    toggle.checked = !!result.distractionFilterEnabled;
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
});
