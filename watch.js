let startTime, updatedTime, difference, tInterval;
let elapsedTime = 0; // Store the elapsed time
const timer = document.getElementById("timer");
const startBtn = document.querySelector(".btn-outline-success");
const stopBtn = document.querySelector(".btn-outline-danger");
const resetBtn = document.querySelector(".btn-outline-warning");

// Set initial state
let isRunning = false;

// Event Listeners
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

function start() {
  if (!isRunning) {
    if (elapsedTime === 0) {
      // Start from the beginning
      startTime = new Date().getTime();
    } else {
      // Resume from where it was stopped
      startTime = new Date().getTime() - elapsedTime;
    }
    tInterval = setInterval(updateTime, 1000);
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(tInterval);
    tInterval = null; // Stop the interval
    elapsedTime = new Date().getTime() - startTime; // Store the elapsed time
    isRunning = false;
    startBtn.disabled = false; // Re-enable the Start button
  }
}

function reset() {
  if (isRunning) {
    clearInterval(tInterval);
    tInterval = null; // Stop the interval
    isRunning = false;
  }
  // Reset the timer display to 00 hr 00 m 00 s
  timer.innerHTML = `
        <span class="digits">00</span> <span class="labels">hr</span>
        <span class="digits">00</span> <span class="labels">m</span>
        <span class="digits">00</span> <span class="labels">s</span>
    `;
  elapsedTime = 0; // Reset the elapsed time
  startBtn.disabled = false; // Enable the Start button
  stopBtn.disabled = true; // Disable the Stop button
  resetBtn.disabled = true; // Disable the Reset button
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = `
        <span class="digits">${hours}</span> <span class="labels">hr</span>
        <span class="digits">${minutes}</span> <span class="labels">m</span>
        <span class="digits">${seconds}</span> <span class="labels">s</span>
    `;
}
