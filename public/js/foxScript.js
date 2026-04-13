let currentImageUrl1 = "";
let currentImageUrl2 = "";

// Preload images before displaying them
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error("Failed to load image"));
  });
}

// Hide loaders
function hideLoader(loaderId) {
  const loader = document.getElementById(loaderId);
  if (loader) {
    loader.style.display = "none";
  }
}

// Show loaders
function showLoader(loaderId) {
  const loader = document.getElementById(loaderId);
  if (loader) {
    loader.style.display = "flex";
  }
}

// Setup vote button listeners
function setupVoteButtons() {
  document.querySelectorAll(".btn-vote").forEach((btn) => {
    // Remove old event listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", function () {
      const side = this.getAttribute("data-side");
      if (side === "left") {
        voteFox(currentImageUrl1, currentImageUrl2);
      } else {
        voteFox(currentImageUrl2, currentImageUrl1);
      }
    });
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Get initial URLs from the DOM
  const img1 = document.getElementById("foxImage1");
  const img2 = document.getElementById("foxImage2");
  if (img1 && img2) {
    currentImageUrl1 = img1.src;
    currentImageUrl2 = img2.src;
    // Hide loaders since images are already loaded
    hideLoader("loader1");
    hideLoader("loader2");
  }
  setupVoteButtons();
});

async function voteFox(winnerUrl, loserUrl) {
  const buttons = document.querySelectorAll(".btn-vote");
  buttons.forEach((btn) => (btn.disabled = true));

  try {
    const response = await fetch("/api/fox/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winnerUrl: winnerUrl,
        loserUrl: loserUrl,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showFeedback(data.message, "success");
      // No longer auto-load, let user click "Ny Runde" button
    } else {
      showFeedback(data.message, "error");
      // Re-enable buttons on error
      document
        .querySelectorAll(".btn-vote")
        .forEach((btn) => (btn.disabled = false));
    }
  } catch (error) {
    showFeedback("Feil ved stemmegivning", "error");
    // Re-enable buttons on error
    document
      .querySelectorAll(".btn-vote")
      .forEach((btn) => (btn.disabled = false));
  }
}

async function loadNewRound() {
  // Show loading indicators and disable buttons
  showLoader("loader1");
  showLoader("loader2");
  const voteButtons = document.querySelectorAll(".btn-vote");
  voteButtons.forEach((btn) => (btn.disabled = true));

  const newRoundBtn = document.getElementById("newRoundButton");
  if (newRoundBtn) newRoundBtn.disabled = true;

  try {
    const response = await fetch("/api/fox/new");
    const data = await response.json();

    if (data.success) {
      // Preload both images before displaying
      try {
        await Promise.all([
          preloadImage(data.imageUrl1),
          preloadImage(data.imageUrl2),
        ]);

        // Images are loaded, now update the UI
        currentImageUrl1 = data.imageUrl1;
        currentImageUrl2 = data.imageUrl2;
        document.getElementById("foxImage1").src = data.imageUrl1;
        document.getElementById("foxImage2").src = data.imageUrl2;

        // Hide loaders once images are displayed
        hideLoader("loader1");
        hideLoader("loader2");

        // Reset vote counts
        document.querySelectorAll(".vote-count").forEach((el) => {
          el.textContent = "0";
        });

        clearFeedback();
        setupVoteButtons(); // Re-setup buttons with new URLs

        // Re-enable all buttons
        document
          .querySelectorAll(".btn-vote")
          .forEach((btn) => (btn.disabled = false));
        if (newRoundBtn) newRoundBtn.disabled = false;
      } catch (imageError) {
        showFeedback("Feil ved lasting av bildene. Prøv igjen.", "error");
        hideLoader("loader1");
        hideLoader("loader2");
        document
          .querySelectorAll(".btn-vote")
          .forEach((btn) => (btn.disabled = false));
        if (newRoundBtn) newRoundBtn.disabled = false;
      }
    }
  } catch (error) {
    showFeedback("Feil ved lasting av nye bilder", "error");
    hideLoader("loader1");
    hideLoader("loader2");
    document
      .querySelectorAll(".btn-vote")
      .forEach((btn) => (btn.disabled = false));
    if (newRoundBtn) newRoundBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const newRoundBtn = document.getElementById("newRoundButton");
  if (newRoundBtn) {
    newRoundBtn.addEventListener("click", loadNewRound);
  }
});

function showFeedback(message, type) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
  feedback.style.display = "block";

  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}

function clearFeedback() {
  document.getElementById("feedback").style.display = "none";
}
