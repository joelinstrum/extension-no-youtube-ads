const clickSkip = (ad) => {
  var skipBtn = document.querySelector("button[class*='ytp-ad-skip']");
  if (!skipBtn) {
    skipBtn = ad && ad.querySelector("button[class*='ytp-button']");
  }
  if (skipBtn) {
    skipBtn.click();
  }
};

const skipVideo = (ad) => {
  if (!ad) {
    return;
  }
  var video = ad.querySelector("video");
  if (video) {
    video.onloadedmetadata = function () {
      if (!isNaN(video.duration) && isFinite(video.duration)) {
        video.currentTime = video.duration;
      }
    };
  }
};

const removeAds = () => {
  var ad = document.querySelector(".ytp-ad-player-overlay");
  if (ad) {
    skipVideo(ad);
    clickSkip(ad);
    return;
  }
  ad = document.querySelector(".ad-showing");
  if (ad) {
    skipVideo();
  }
};
removeAds();

// Function to create a MutationObserver
function setupMutationObserver() {
  // Create a MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    // Disconnect the observer to avoid reacting to changes initiated by this function
    observer.disconnect();

    removeAds();

    // Reconnect the observer after making changes
    observer.observe(document.body, config);
  });

  // Define the configuration for the observer
  const config = { childList: true, subtree: true };

  // Start observing the body and its descendants for changes
  observer.observe(document.body, config);
}

// Execute setupMutationObserver when the content script is injected
setupMutationObserver();
