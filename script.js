const startBtn = document.getElementById("startBtn");
const song = document.getElementById("song");
const lyricText = document.querySelector("#box1 .lyric-text");

// First line stays exactly where it was.
// Every line after it is delayed slightly.
const cards = [
  { time: 650, text: "This love between you and I is simple as pie, baby" },
  { time: 6050, text: "Yeah, it's such a sure thing" },
  { time: 7100, text: "it's such a sure thing" },
  { time: 8300, text: "Oh, it such a sure thing" },
  { time: 9900, text: "it's such a sure thing" },
  { time: 14550, text: "Even when The sky comes falling" },
  { time: 16550, text: "Even when The sun don't shine" },
  { time: 18300, text: "You could bet that, never gotta sweat that" },
  { time: 20100, text: "I got faith in you and I" },
  { time: 22850, text: "So put your pretty little hand in mine" }
];

let timers = [];

function fadeInText(text) {
  lyricText.classList.remove("visible");
  lyricText.textContent = text;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lyricText.classList.add("visible");
    });
  });
}

function fadeOutText() {
  lyricText.classList.remove("visible");
}

function resetAnimation() {
  timers.forEach(clearTimeout);
  timers = [];
  lyricText.classList.remove("visible");
  lyricText.textContent = "";
}

async function startAnimation() {
  resetAnimation();
  startBtn.disabled = true;

  song.pause();
  song.currentTime = 0;

  try {
    await song.play();

    cards.forEach((card, index) => {
      timers.push(
        setTimeout(() => {
          fadeInText(card.text);
        }, card.time)
      );

      const nextTime = cards[index + 1]?.time;
      const fadeOutAt = nextTime
        ? Math.max(card.time + 900, nextTime - 380)
        : card.time + 2600;

      timers.push(
        setTimeout(() => {
          fadeOutText();
        }, fadeOutAt)
      );
    });

    song.addEventListener("ended", () => {
      fadeOutText();
      startBtn.disabled = false;
    }, { once: true });

  } catch (error) {
    console.error(error);
    startBtn.disabled = false;
    alert("Audio could not play. Refresh and try again.");
  }
}

startBtn.addEventListener("click", startAnimation);
