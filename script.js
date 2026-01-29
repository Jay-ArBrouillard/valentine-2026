const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const arena = document.getElementById("arena");
const gif = document.getElementById("gif");

let noClicks = 0;
let noMoves = 0;

const noLines = [
  "No 😶",
  "Wait—are you sure? 😳",
  "Are you super sure? 🫢",
  "Last chance... really? 😬",
  "This feels like a yes moment 👀",
  "Okay but hear me out 🥺",
  "No is getting shy now 🫣",
  "No has left the chat 🏃‍♂️💨"
];

const noMoveThreshold = 4;

function updateNoText() {
  const idx = Math.min(noClicks, noLines.length - 1);
  noBtn.textContent = noLines[idx];
}

function moveNoButton() {
  const pad = 10;

  const arenaRect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(pad, arenaRect.width - btnRect.width - pad);
  const maxY = Math.max(pad, arenaRect.height - btnRect.height - pad);

  const x = Math.max(pad, Math.floor(Math.random() * maxX));
  const y = Math.max(pad, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0, 0)";
  noMoves += 1;
}

function shouldDodge() {
  return noClicks >= noMoveThreshold;
}

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  noClicks += 1;
  updateNoText();

  if (noClicks === noMoveThreshold) {
    subtitle.textContent = "Okay, now the No button is getting shy…";
    noBtn.style.opacity = "0.85";
  }
});

arena.addEventListener("mousemove", (event) => {
  if (!shouldDodge()) return;

  const btnRect = noBtn.getBoundingClientRect();
  const distanceX = Math.abs(event.clientX - (btnRect.left + btnRect.width / 2));
  const distanceY = Math.abs(event.clientY - (btnRect.top + btnRect.height / 2));

  if (distanceX < 80 && distanceY < 60) {
    moveNoButton();
    if (noMoves >= 4) noBtn.style.opacity = "0.7";
  }
});

yesBtn.addEventListener("click", () => {
  subtitle.textContent = "YAY!! 🎉 Best decision ever 💞";
  gif.src = "https://tenor.com/view/penguin-penguin-hug-hug-cuddle-gif-20715886";
  gif.alt = "Penguins hugging";
  yesBtn.textContent = "Confirmed ✅";
  noBtn.style.display = "none";
});
