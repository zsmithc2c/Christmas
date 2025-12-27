/**
 * Digital Christmas Card
 * - Cover -> open card
 * - Inside -> reveal surprise overlay
 * - Surprise -> show DWTS logo + play music
 *
 * Replace files in /assets:
 * - cover.jpg
 * - dwts-logo.jpeg
 * - dwts2.webp
 * - dwts-theme.mp3
 */

const ASSETS = {
  cover: "assets/cover.jpg",
  logo: "assets/dwts-logo.jpeg",
  details: "assets/dwts2.webp",
  music: "assets/dwts-theme.mp3",
};

const card = document.getElementById("card");
const toggleBtn = document.getElementById("toggleBtn");
const snowBtn = document.getElementById("snowBtn");

const coverPhoto = document.getElementById("coverPhoto");
const dwtsLogo = document.getElementById("dwtsLogo");
const dwtsDetails = document.getElementById("dwtsDetails");

const overlay = document.getElementById("overlay");
const overlayBg = document.getElementById("overlayBg");
const revealBtn = document.getElementById("revealBtn");
const closeBtn = document.getElementById("closeBtn");

const audioEl = document.getElementById("dwtsAudio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("muteBtn");

const toast = document.getElementById("toast");

// Set cover photo background
coverPhoto.style.backgroundImage = `url('${ASSETS.cover}')`;
if (dwtsLogo) dwtsLogo.src = ASSETS.logo;
if (dwtsDetails) dwtsDetails.src = ASSETS.details;

function setOpen(isOpen) {
  card.classList.toggle("open", isOpen);
}

function toggleOpen() {
  setOpen(!card.classList.contains("open"));
}

// Card click / key controls
card.addEventListener("click", (e) => {
  // Don't toggle when clicking buttons inside
  if (e.target.closest("button")) return;
  toggleOpen();
});

card.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleOpen();
  }
});

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleOpen();
});

// Overlay controls
function showOverlay() {
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
  tryPlay();
}

function hideOverlay() {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
  try {
    audioEl.pause();
  } catch (_e) {}
}

revealBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showOverlay();
});

overlayBg.addEventListener("click", hideOverlay);
closeBtn.addEventListener("click", hideOverlay);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideOverlay();
});

// Audio controls
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function tryPlay() {
  // Browsers often block autoplay until user interacts; we do best-effort
  try {
    audioEl.currentTime = 0;
    const p = audioEl.play();
    if (p && typeof p.then === "function") await p;
  } catch (err) {
    showToast("Tap Play to start the music.");
  }
}

playBtn.addEventListener("click", async () => {
  try {
    const p = audioEl.play();
    if (p && typeof p.then === "function") await p;
  } catch (err) {
    showToast("Audio couldn’t play — check assets/dwts-theme.mp3");
  }
});

pauseBtn.addEventListener("click", () => {
  try {
    audioEl.pause();
  } catch (_e) {}
});

muteBtn.addEventListener("click", () => {
  audioEl.muted = !audioEl.muted;
  muteBtn.textContent = audioEl.muted ? "Unmute" : "Mute";
});

// Simple CSS snow generator (no canvas)
let snowOn = false;
let snowEl = null;
let snowInterval = null;

function makeSnowLayer() {
  const el = document.createElement("div");
  el.className = "snow";
  document.body.appendChild(el);
  return el;
}

function spawnFlake() {
  if (!snowEl) return;
  const flake = document.createElement("div");
  flake.className = "flake";
  const left = Math.random() * 100;
  const size = 4 + Math.random() * 8;
  const duration = 4 + Math.random() * 6;

  flake.style.left = left + "vw";
  flake.style.width = size + "px";
  flake.style.height = size + "px";
  flake.style.opacity = String(0.45 + Math.random() * 0.45);
  flake.style.animationDuration = duration + "s";

  snowEl.appendChild(flake);

  // Cleanup
  setTimeout(() => {
    flake.remove();
  }, (duration + 0.2) * 1000);
}

function setSnow(enabled) {
  snowOn = enabled;

  if (snowOn) {
    if (!snowEl) snowEl = makeSnowLayer();
    snowInterval = setInterval(spawnFlake, 110);
    snowBtn.textContent = "❄️ Snow (On)";
  } else {
    if (snowInterval) clearInterval(snowInterval);
    snowInterval = null;
    if (snowEl) snowEl.remove();
    snowEl = null;
    snowBtn.textContent = "❄️ Snow";
  }
}

snowBtn.addEventListener("click", () => setSnow(!snowOn));

// Preload audio a bit (won't autoplay until allowed)
audioEl.load();
