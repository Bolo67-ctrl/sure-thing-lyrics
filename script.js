const startBtn = document.getElementById("startBtn");
const song = document.getElementById("song");

const box1 = document.querySelector("#box1 .lyric-text");
const box2 = document.querySelector("#box2 .lyric-text");

const cards = [
  { time: 650, box: 1, text: "This love between you and I is simple as pie, baby" },
  { time: 4330, box: 2, text: "Yeah, it's such a sure thing" },
  { time: 5910, box: 1, text: "it's such a sure thing" },
  { time: 7780, box: 2, text: "Oh, it such a sure thing" },
  { time: 9550, box: 1, text: "it's such a sure thing" },
  { time: 11970, box: 2, text: "Even when The sky comes falling" },
  { time: 14380, box: 1, text: "Even when The sun don't shine" },
  { time: 16430, box: 2, text: "You could bet that, never gotta sweat that" },
  { time: 18400, box: 1, text: "I got faith in you and I" },
  { time: 21550, box: 2, text: "So put your pretty little hand in mine" }
];

let timers = [];

function getBox(boxNumber) {
  return boxNumber === 1 ? box1 : box2;
}

function fadeInText(boxNumber, text) {
  const target = getBox(boxNumber);

  target.classList.remove("visible");
  target.textContent = text;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add("visible");
    });
  });
}

function fadeOutText(boxNumber) {
  getBox(boxNumber).classList.remove("visible");
}

function resetAnimation() {
  timers.forEach(clearTimeout);
  timers = [];

  [box1, box2].forEach((box) => {
    box.classList.remove("visible");
    box.textContent = "";
  });
}

function nextTimeForSameBox(index) {
  for (let i = index + 1; i < cards.length; i++) {
    if (cards[i].box === cards[index].box) {
      return cards[i].time;
    }
  }
  return null;
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
          fadeInText(card.box, card.text);
        }, card.time)
      );

      const nextTime = nextTimeForSameBox(index);
      const fadeOutAt = nextTime
        ? Math.max(card.time + 900, nextTime - 450)
        : card.time + 2600;

      timers.push(
        setTimeout(() => {
          fadeOutText(card.box);
        }, fadeOutAt)
      );
    });

    song.addEventListener("ended", () => {
      fadeOutText(1);
      fadeOutText(2);
      startBtn.disabled = false;
    }, { once: true });

  } catch (error) {
    console.error(error);
    startBtn.disabled = false;
    alert("Audio could not play. Refresh and try again.");
  }
}

startBtn.addEventListener("click", startAnimation);
