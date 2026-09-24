const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const song = document.getElementById("song");

const box1 = document.querySelector("#box1 .lyric-text");
const box2 = document.querySelector("#box2 .lyric-text");

const cards = [
  { time: 1000, box: 1, text: "This love between you and I is simple as pie, baby" },
  { time: 4300, box: 2, text: "Yeah, it's such a sure thing" },
  { time: 6000, box: 1, text: "it's such a sure thing" },
  { time: 7600, box: 2, text: "Oh, it such a sure thing" },
  { time: 9200, box: 1, text: "it's such a sure thing" },
  { time: 11000, box: 2, text: "Even when The sky comes falling" },
  { time: 14000, box: 1, text: "Even when The sun don't shine" },
  { time: 17000, box: 2, text: "You could bet that, never gotta sweat that" },
  { time: 20000, box: 1, text: "I got faith in you and I" },
  { time: 22500, box: 2, text: "So put your pretty little hand in mine" }
];

let timers = [];

function putText(boxNumber, text) {
  const target = boxNumber === 1 ? box1 : box2;
  target.textContent = text;
  target.style.opacity = "1";
  target.style.transform = "none";
}

function resetBoxes() {
  timers.forEach(clearTimeout);
  timers = [];

  box1.textContent = "";
  box2.textContent = "";

  box1.style.opacity = "1";
  box2.style.opacity = "1";
  box1.style.transform = "none";
  box2.style.transform = "none";
}

async function startAnimation() {
  resetBoxes();
  startBtn.disabled = true;

  try {
    song.pause();
    song.currentTime = 0;
    await song.play();

    startScreen.style.display = "none";

    cards.forEach((card) => {
      const timer = setTimeout(() => {
        putText(card.box, card.text);
      }, card.time);

      timers.push(timer);
    });
  } catch (error) {
    console.error(error);
    startBtn.disabled = false;
    alert("Audio could not play. Refresh and press START again.");
  }
}

startBtn.addEventListener("click", startAnimation);
