const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const song = document.getElementById("song");

const box1 = document.querySelector("#box1 .lyric-text");
const box2 = document.querySelector("#box2 .lyric-text");

const cards = [
  { time: 650, box: 1, text: "This love between you and I is simple as pie, baby" },
  { time: 4300, box: 2, text: "Yeah, it's such a sure thing" },
  { time: 6050, box: 1, text: "it's such a sure thing" },
  { time: 7520, box: 2, text: "Oh, it such a sure thing" },
  { time: 9150, box: 1, text: "it's such a sure thing" },
  { time: 14420, box: 2, text: "Even when The sky comes falling" },
  { time: 16370, box: 1, text: "Even when The sun don't shine" },
  { time: 18160, box: 2, text: "You could bet that, never gotta sweat that" },
  { time: 20735, box: 1, text: "I got faith in you and I" },
  { time: 23090, box: 2, text: "So put your pretty little hand in mine" }
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
