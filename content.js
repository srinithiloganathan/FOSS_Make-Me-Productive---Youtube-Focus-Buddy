const entertainmentKeywords = [
  "music", "comedy", "trailer", "gameplay", "reaction", "vlog", "promo",
  "bollywood", "tollywood", "kollywood", "tamil", "dance", "short film",
  "hook step", "songs", "bgm", "teaser", "funny", "meme", "celebrity", "romantic",
  "love", "open talk", "relationship", "trip", "galatta", "dance show", "singing show",
  "interview", "pregnancy", "marriage", "video song", "movie", "korean series", "korean drama",
  "chinese drama", "drama", "series", "show", "reality show", "trending", "viral", "challenge", "funny videos",
  "funny moments", "prank", "skit", "parody", "spoof", "reaction video", "behind the scenes", "behind the scene", 
  "actor", "actress", "celebrity news", "celebrity gossip", "celebrity interview", "celebrity lifestyle",
  "celebrity fashion", "celebrity makeup", "celebrity skincare", "celebrity workout", "celebrity diet", "celebrity health",
  "beatbox", "dance challenge", "singing challenge", "lip sync", "meme compilation", "funny compilation",
  "best moments", "funniest moments", "epic moments", "fail compilation", "try not to laugh", "try not to cry",
  "try not to smile", "try not to get scared", "try not to cringe", "try not to sing", "try not to dance", "try not to laugh", 
  "entertainment", "prank", "party", "celebration", "event", "festival", "holiday", "vacation",
  "trip", "travel", "adventure", "exploration", "journey", "road trip", "backpacking", "camping", "hiking",
  "ft", "song", "music video", "music album", "music playlist", "music mix", "music compilation", "birthday", "anniversary",
  "wedding", "engagement", "baby shower", "bridal shower", "bachelorette party", "bachelor party", "graduation",
  "farewell", "reunion", "get together", "family gathering", "friends gathering", "office party", "audio", "audio song",
  "saree review", "saree draping", "saree styling", "saree collection", "saree haul", "saree lookbook", "shopping",
  "hairstyles", "hairstyle tutorial", "hairstyle ideas", "hairstyle inspiration", "hairstyle trends", "hairstyle hacks",
  "travel vlog", "travel guide", "travel tips", "travel hacks", "travel inspiration", "travel photography", "pretty",
  "beautiful", "gorgeous", "stunning", "cute", "adorable", "lovely", "pretty", "fashion", "style", "outfit", "clothing",
  "accessories", "jewelry", "makeup", "skincare", "beauty", "cosmetics", "nail art", "nail design", "nail tutorial",
  "BTS", "behind the scenes", "making of", "on set", "off set", "outtakes", "blooper", "bloopers", "funny moments",
  "cooking", "blouse", "tour", "stage performance", "live performance", "concert", "music festival", "love", "Red carpet",
  "cwc", "super hits", "netflix", "amazon prime", "hotstar", "disney plus", "concert", "rapid fire"
];

const educationalKeywords = ["education", "tutorial", "how to", "lesson", "course", "study", "explained", "lecture"];

const distractingKeywordMessages = {
  music: "Silence can be golden when you're learning.",
  comedy: "Laughter is great, but focus fuels progress!",
  movie: "Blockbusters can wait. Build your future now.",
  prank: "Real success isn't a prank!",
  reaction: "React to your goals instead!",
  vlog: "Make your own story worth vlogging!",
  shorts: "Think long-term. Skip the Shorts.",
  entertainment: "Fun's great, but growth is better.",
  trailer: "Focus on the bigger picture, not just trailers.",
  gameplay: "Build your own game of success!",
  bollywood: "Bollywood can wait. Your skills can't.",
  tollywood: "Success doesn't have subtitles. Focus!",
  kollywood: "Forget the drama, focus on your dreams.",
  dance: "Dance through your work and focus on growth!",
  funny: "Laughter fades, but learning lasts.",
  meme: "Memes are cool, but mastering skills is cooler.",
  romantic: "Love yourself by learning new skills!",
  love: "Love for learning is the ultimate romance.",
  celebrity: "Become your own celebrity with skills!",
  challenge: "Challenge yourself to stay focused!",
  viral: "Chase knowledge, not viral trends.",
  reality_show: "Real success doesn't happen on reality shows.",
  skit: "Focus on your script for success, not skits.",
  behind_the_scenes: "Success is made behind the scenes.",
  actor: "Be the actor of your own life story.",
  actress: "Focus on becoming the star of your own future.",
  beatbox: "Beat your distractions with focus!",
  fail_compilation: "Don't compile fails. Compile skills!"
};

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

let filterRunning = false;

function isEducational(text) {
  return educationalKeywords.some(keyword =>
    text.toLowerCase().includes(keyword)
  );
}

function shouldFilterOut(text) {
  const lowerText = text.toLowerCase();
  return entertainmentKeywords.find(keyword =>
    lowerText.includes(keyword)
  );
}

function getMotivationalMessage(keyword) {
  if (distractingKeywordMessages[keyword]) {
    return distractingKeywordMessages[keyword];
  }
  const messages = Object.values(distractingKeywordMessages);
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function applyFilter() {
  if (filterRunning) return;
  filterRunning = true;

  const videoItems = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer');
  
  videoItems.forEach(item => {
    const textContent = item.innerText;
    const keyword = shouldFilterOut(textContent);
    
    if (keyword && !isEducational(textContent)) {
      const dp = item.querySelector('ytd-channel-renderer img') || item.querySelector('img#img');
      if (dp) dp.style.display = 'none';
      
      if (!item.querySelector('.focus-filter-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'focus-filter-overlay';
        overlay.setAttribute('style', motivationalOverlayStyle);
        overlay.innerText = getMotivationalMessage(keyword);
        
        item.style.position = 'relative';
        item.appendChild(overlay);
      }
      
      item.style.opacity = '0.3';
      item.style.pointerEvents = 'none';
    }
  });
  
  filterRunning = false;
}

function initFilter() {
  filterRunning = false;
  applyFilter();

  const observer = new MutationObserver(() => {
    if (!filterRunning) {
      applyFilter();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  return observer;
}

let observer = null;
chrome.storage.sync.get(["distractionFilterEnabled"], result => {
  if (result.distractionFilterEnabled) {
    if (observer) {
      observer.disconnect();
    }
    observer = initFilter();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.distractionFilterEnabled) {
    if (changes.distractionFilterEnabled.newValue) {
      if (observer) {
        observer.disconnect();
      }
      observer = initFilter();
    } else {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      document.querySelectorAll('.focus-filter-overlay').forEach(overlay => {
        overlay.remove();
      });

      document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer').forEach(item => {
        item.style.opacity = '';
        item.style.pointerEvents = '';

        const dp = item.querySelector('ytd-channel-renderer img') || item.querySelector('img#img');
        if (dp) dp.style.display = '';
      });
    }
  }
});