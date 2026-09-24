const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const cardsContainer = document.getElementById("cards");
const song = document.getElementById("song");

const cards = [
  { time: 0, text: "First card" },
  { time: 1200, text: "Second card" },
  { time: 2400, text: "Third card" },
  { time: 3600, text: "Fourth card" },
  { time: 4800, text: "Fifth card" }
];

function createCard(text) {
  const card = document.createElement("div");
  card.className = "lyric-card";
  card.textContent = text;
  card.style.left = `${35 + Math.random() * 30}%`;
  cardsContainer.appendChild(card);

  setTimeout(() => card.remove(), 6500);
}

async function startAnimation() {
  startBtn.disabled = true;

  try {
    song.pause();
    song.currentTime = 0;
    await song.play();

    startScreen.style.display = "none";

    cards.forEach((card) => {
      setTimeout(() => createCard(card.text), card.time);
    });
  } catch (error) {
    console.error("Audio playback failed:", error);
    startBtn.disabled = false;
    alert("Audio could not play. Refresh the page and press START again.");
  }
}

startBtn.addEventListener("click", startAnimation);
