const startBtn = document.getElementById("startBtn");
const syncBtn = document.getElementById("syncBtn");
const markBtn = document.getElementById("markBtn");
const undoBtn = document.getElementById("undoBtn");
const testBtn = document.getElementById("testBtn");
const copyBtn = document.getElementById("copyBtn");
const syncPanel = document.getElementById("syncPanel");
const syncTime = document.getElementById("syncTime");
const syncLabel = document.getElementById("syncLabel");
const syncLine = document.getElementById("syncLine");
const syncStatus = document.getElementById("syncStatus");
const song = document.getElementById("song");

const box1 = document.querySelector("#box1 .lyric-text");
const box2 = document.querySelector("#box2 .lyric-text");

const defaultCards = [
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

let cards = defaultCards.map(card => ({ ...card }));
let timers = [];
let syncIndex = 0;
let markedTimes = [];
let syncRunning = false;
let clockFrame = null;

const saved = localStorage.getItem("sureThingTimings");
if (saved) {
  try {
    const savedTimes = JSON.parse(saved);
    if (Array.isArray(savedTimes) && savedTimes.length === cards.length) {
      cards = cards.map((card, index) => ({ ...card, time: savedTimes[index] }));
    }
  } catch {}
}

function putText(boxNumber, text) {
  const target = boxNumber === 1 ? box1 : box2;
  target.textContent = text;
}

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function resetBoxes() {
  clearTimers();
  box1.textContent = "";
  box2.textContent = "";
}

function scheduleAnimation() {
  clearTimers();

  cards.forEach((card) => {
    const timer = setTimeout(() => {
      putText(card.box, card.text);
    }, card.time);

    timers.push(timer);
  });
}

async function playAnimation() {
  syncRunning = false;
  cancelAnimationFrame(clockFrame);
  resetBoxes();

  song.pause();
  song.currentTime = 0;

  try {
    await song.play();
    scheduleAnimation();
  } catch (error) {
    console.error(error);
    alert("Audio could not play. Refresh and try again.");
  }
}

function updateClock() {
  syncTime.textContent = song.currentTime.toFixed(2) + "s";

  if (syncRunning) {
    clockFrame = requestAnimationFrame(updateClock);
  }
}

function showNextSyncLine() {
  if (syncIndex >= cards.length) {
    syncLabel.textContent = "All lines marked.";
    syncLine.textContent = "Tap TEST SYNC to hear your timing.";
    markBtn.disabled = true;
    testBtn.disabled = false;
    copyBtn.disabled = false;
    syncStatus.textContent = "Saved in this browser.";
    return;
  }

  syncLabel.textContent = `Line ${syncIndex + 1} of ${cards.length} — press SPACE or MARK when you hear it start`;
  syncLine.textContent = cards[syncIndex].text;
  markBtn.disabled = false;
}

async function startSync() {
  resetBoxes();
  syncPanel.classList.add("active");
  syncIndex = 0;
  markedTimes = [];
  syncRunning = true;
  markBtn.disabled = false;
  testBtn.disabled = true;
  copyBtn.disabled = true;
  undoBtn.disabled = true;
  syncStatus.textContent = "";

  song.pause();
  song.currentTime = 0;

  showNextSyncLine();

  try {
    await song.play();
    updateClock();
  } catch (error) {
    console.error(error);
    alert("Audio could not play. Refresh and try again.");
  }
}

function markCurrentLine() {
  if (!syncRunning || syncIndex >= cards.length) return;

  const time = Math.round(song.currentTime * 1000);
  markedTimes.push(time);
  cards[syncIndex].time = time;
  syncIndex += 1;

  undoBtn.disabled = false;

  if (syncIndex >= cards.length) {
    syncRunning = false;
    song.pause();
    cancelAnimationFrame(clockFrame);

    localStorage.setItem(
      "sureThingTimings",
      JSON.stringify(cards.map(card => card.time))
    );
  }

  showNextSyncLine();
}

function undoMark() {
  if (markedTimes.length === 0) return;

  syncIndex -= 1;
  markedTimes.pop();

  if (syncIndex < 0) syncIndex = 0;

  syncRunning = true;
  markBtn.disabled = false;
  testBtn.disabled = true;
  copyBtn.disabled = true;
  undoBtn.disabled = markedTimes.length === 0;

  showNextSyncLine();

  if (song.paused) {
    song.play();
    updateClock();
  }
}

async function testSync() {
  syncPanel.classList.remove("active");
  await playAnimation();
}

async function copyTimings() {
  const values = cards.map(card => card.time);
  await navigator.clipboard.writeText(values.join(", "));
  syncStatus.textContent = "Timings copied. Paste them into ChatGPT.";
}

startBtn.addEventListener("click", playAnimation);
syncBtn.addEventListener("click", startSync);
markBtn.addEventListener("click", markCurrentLine);
undoBtn.addEventListener("click", undoMark);
testBtn.addEventListener("click", testSync);
copyBtn.addEventListener("click", copyTimings);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && syncRunning) {
    event.preventDefault();
    markCurrentLine();
  }
});

markBtn.disabled = true;
undoBtn.disabled = true;
testBtn.disabled = true;
copyBtn.disabled = true;
