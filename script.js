const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const lyricBoxes = document.getElementById("lyricBoxes");
const song = document.getElementById("song");

const boxTexts = [
  document.querySelector("#box1 .lyric-text"),
  document.querySelector("#box2 .lyric-text")
];

// Timing is in milliseconds from the start of sure-thing.mp3.
const cards = [
  { time: 1000, text: "This love between you and I is simple as pie, baby" },
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

let timers = [];

function showText(boxIndex, text) {
  const target = boxTexts[boxIndex];

  target.classList.remove("show");

  setTimeout(() => {
    target.textContent = text;
    target.classList.add("show");
  }, 90);
}

function clearAnimation() {
  timers.forEach(clearTimeout);
  timers = [];

  boxTexts.forEach((target) => {
    target.textContent = "";
    target.classList.remove("show");
  });
}

async function startAnimation() {
  startBtn.disabled = true;
  clearAnimation();

  try {
    song.pause();
    song.currentTime = 0;
    await song.play();

    startScreen.style.display = "none";
    lyricBoxes.classList.add("active");

    cards.forEach((card, index) => {
      const timer = setTimeout(() => {
        showText(index % 2, card.text);
      }, card.time);

      timers.push(timer);
    });
  } catch (error) {
    console.error("Audio playback failed:", error);
    startBtn.disabled = false;
    alert("Audio could not play. Refresh the page and press START again.");
  }
}

startBtn.addEventListener("click", startAnimation);
