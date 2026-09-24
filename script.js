const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const cardsContainer = document.getElementById("cards");
const song = document.getElementById("song");
// Temporary text so we can build/test the animation.
// We'll replace these with your chosen song section later.
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

  // Give each card a slightly different horizontal position.
  const position = 35 + Math.random() * 30;

  card.style.left = `${position}%`;

  cardsContainer.appendChild(card);

  setTimeout(() => {
    card.remove();
  }, 6500);
}

function startAnimation() {
  startScreen.style.display = "none";

  song.currentTime = 0;
  song.play();

  cards.forEach(card => {
    setTimeout(() => {
      createCard(card.text);
    }, card.time);
  });
}