const distractingKeywords = {
  comedy: "Laughter is great, but focus fuels progress!",
  music: "Silence can be golden when you're learning.",
  movie: "Blockbusters can wait. Build your future now.",
  prank: "Real success isn't a prank!",
  reaction: "React to your goals instead!",
  vlog: "Make your own story worth vlogging!",
  shorts: "Think long-term. Skip the Shorts.",
  entertainment: "Fun's great, but growth is better."
};

const educationalKeywords = ["education", "tutorial", "how to", "lesson", "course", "study", "explained", "lecture"];

const motivationalOverlayStyle = `
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #222;
  border-radius: 12px;
  z-index: 9999;
`;

function isEducational(text) {
  return educationalKeywords.some(keyword =>
    text.toLowerCase().includes(keyword)
  );
}

function shouldFilterOut(text) {
  const lowerText = text.toLowerCase();
  return Object.keys(distractingKeywords).find(keyword =>
    lowerText.includes(keyword)
  );
}

function applyFilter() {
  const videoItems = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer');

  videoItems.forEach(item => {
    const textContent = item.innerText.toLowerCase();

    const keyword = shouldFilterOut(textContent);
    if (keyword && !isEducational(textContent)) {
      // Hide channel DP
      const dp = item.querySelector('ytd-channel-renderer img') || item.querySelector('img#img');
      if (dp) dp.style.display = 'none';

      // Add motivational overlay
      if (!item.querySelector('.focus-filter-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'focus-filter-overlay';
        overlay.setAttribute('style', motivationalOverlayStyle);
        overlay.innerText = distractingKeywords[keyword] || "Stay focused!";
        item.style.position = 'relative';
        item.appendChild(overlay);
      }

      item.style.opacity = '0.3';
      item.style.pointerEvents = 'none';
    }
  });
}

function initFilter() {
  const observer = new MutationObserver(() => applyFilter());
  observer.observe(document.body, { childList: true, subtree: true });
  applyFilter();
}

chrome.storage.sync.get(["distractionFilterEnabled"], result => {
  if (result.distractionFilterEnabled) {
    initFilter();
  }
});
