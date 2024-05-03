const removeAds = () => {
  var skipBtn = (skipBtn = document.querySelector(
    "button[class*='ytp-ad-skip']"
  ));
  if (skipBtn) skipBtn.click();
  var ad = document.querySelector(".ytp-ad-player-overlay");
  if (ad) {
    var video = document.querySelector("video");
    if (video) {
      video.currentTime = video.duration;
    }
    if (skipBtn) {
      skipBtn.click();
    }
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
