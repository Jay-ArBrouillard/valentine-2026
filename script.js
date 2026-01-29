const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const arena = document.getElementById("arena");
const gif = document.getElementById("gif");

let noDodges = 0;

const noLines = [
  "No 😶",
  "Wait—are you sure? 😳",
  "That seems… incorrect 🤨",
  "Your cursor is looking kinda yes-ish 👀",
  "Plot twist: the No button is shy 🫣",
  "Okay but what if I said please? 🥺",
  "This is getting embarrassing for No 😭",
  "No has left the chat 🏃‍♂️💨"
];

function moveNoButton() {
  const pad = 12;

  const arenaRect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = arenaRect.width - btnRect.width - pad;
  const maxY = arenaRect.height - btnRect.height - pad;

  const x = Math.max(pad, Math.floor(Math.random() * maxX));
  const y = Math.max(pad, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;
  noBtn.style.transform = "translate(0, 0)";
}

function updateNoText() {
  const idx = Math.min(noDodges, noLines.length - 1);
  noBtn.textContent = noLines[idx];
}

noBtn.addEventListener("mouseenter", () => {
  noDodges++;
  updateNoText();

  // Make it progressively harder
  if (noDodges >= 3) noBtn.style.opacity = "0.85";
  if (noDodges >= 5) noBtn.style.opacity = "0.70";
  if (noDodges >= 7) noBtn.style.opacity = "0.55";

  moveNoButton();
});

noBtn.addEventListener("click", (e) => {
  // In case they manage to click it, still block politely
  e.preventDefault();
  noDodges++;
  updateNoText();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  subtitle.textContent = "YAY!! 🎉 Best decision ever 💞";
  gif.src = "https://media.giphy.com/media/l0HlA1H74pKTmROyA/giphy.gif";
  yesBtn.textContent = "Confirmed ✅";
  noBtn.style.display = "none";
});
