const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const gif = document.getElementById("gif");

let noClicks = 0;
let noMoves = 0;

const noLines = [
  "No 😶",
  "Wait—are you sure? 😳",
  "Are you super sure? \uD83E\uDD7A",
  "Last chance... really? 😬",
  "This feels like a yes moment 👀",
  "Okay but hear me out 🥺",
  "No is getting shy now \uD83E\uDD63",
  "No has left the chat 🏃‍♂️💨"
];

const noMoveThreshold = 4;
const dodgeStep = 120;
const dodgeTriggerX = 180;
const dodgeTriggerY = 140;

function updateNoText() {
  const idx = Math.min(noClicks, noLines.length - 1);
  noBtn.textContent = noLines[idx];
}

function moveNoButton(mouseX, mouseY) {
  const pad = 10;
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const btnRect = noBtn.getBoundingClientRect();

  let centerX = btnRect.left + btnRect.width / 2;
  let centerY = btnRect.top + btnRect.height / 2;

  let dx = centerX - mouseX;
  let dy = centerY - mouseY;
  const distance = Math.hypot(dx, dy) || 1;

  dx /= distance;
  dy /= distance;

  const targetX = centerX + dx * dodgeStep - btnRect.width / 2;
  const targetY = centerY + dy * dodgeStep - btnRect.height / 2;

  const teleportAfterMoves = 3;
  if (noMoves >= teleportAfterMoves) {
    let tries = 0;
    let x = centerX;
    let y = centerY;
    do {
      x = pad + Math.random() * (viewportW - btnRect.width - pad * 2);
      y = pad + Math.random() * (viewportH - btnRect.height - pad * 2);
      tries += 1;
    } while (
      tries < 12 &&
      Math.abs(x + btnRect.width / 2 - mouseX) < dodgeTriggerX &&
      Math.abs(y + btnRect.height / 2 - mouseY) < dodgeTriggerY
    );

    noBtn.style.left = `${Math.floor(x)}px`;
    noBtn.style.top = `${Math.floor(y)}px`;
    noBtn.style.transform = "translate(0, 0)";
    noMoves += 1;
    return;
  }

  const x = Math.min(
    viewportW - btnRect.width - pad,
    Math.max(pad, Math.floor(targetX))
  );
  const y = Math.min(
    viewportH - btnRect.height - pad,
    Math.max(pad, Math.floor(targetY))
  );

  if (noBtn.style.position !== "fixed") {
    noBtn.style.position = "fixed";
  }

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
    const btnRect = noBtn.getBoundingClientRect();
    noBtn.style.position = "fixed";
    noBtn.style.left = `${Math.max(10, Math.floor(btnRect.left))}px`;
    noBtn.style.top = `${Math.max(10, Math.floor(btnRect.top))}px`;
    noBtn.style.transform = "translate(0, 0)";
  }
});

document.addEventListener("mousemove", (event) => {
  if (!shouldDodge()) return;

  const btnRect = noBtn.getBoundingClientRect();
  const distanceX = Math.abs(event.clientX - (btnRect.left + btnRect.width / 2));
  const distanceY = Math.abs(event.clientY - (btnRect.top + btnRect.height / 2));

  if (distanceX < dodgeTriggerX && distanceY < dodgeTriggerY) {
    moveNoButton(event.clientX, event.clientY);
    if (noMoves >= 4) noBtn.style.opacity = "0.7";
  }
});

yesBtn.addEventListener("click", () => {
  subtitle.textContent = "YAY!! 🎉 Best decision ever 💞";
  gif.src = "https://media1.tenor.com/m/HYU9sRLfB3AAAAAd/hug-penguin.gif";
  gif.alt = "Penguins hugging";
  yesBtn.textContent = "Confirmed ✅";
  noBtn.style.display = "none";
});
