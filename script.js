const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const cardsContainer = document.getElementById("cards");
const song = document.getElementById("song");

// Timing is in milliseconds from the start of sure-thing.mp3.
// We can fine-tune these after the first preview.
const cards = [
  { time: 0, text: "This love between you and I is simple as pie, baby" },
  { time: 4300, text: "Yeah, it's such a sure thing" },
  { time: 6000, text: "it's such a sure thing" },
  { time: 7600, text: "Oh, it such a sure thing" },
  { time: 9200, text: "it's such a sure thing" },
  { time: 11000, text: "Even when The sky comes falling" },
  { time: 14000, text: "Even when The sun don't shine" },
  { time: 17000, text: "You could bet that, never gotta sweat that" },
  { time: 20000, text: "I got faith in you and I" },
  { time: 22500, text: "So put your pretty little hand in mine" }
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
