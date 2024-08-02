# Stopwatch App
## Overview
The Stopwatch App is a simple and user-friendly application that allows users to start, stop, and reset a timer.
It displays the elapsed time in hours, minutes, and seconds.
## Features
- **Start Timer**:
  - On click of start button, start the timer.
  - If timer is 0 start from beginning else start from wherever last stopped.
- **Stop Timer**:
  - Stop timer once clicked on the stop button.
- **Reset Timer**:
  - On click of reset stop the watch (if already started) and set timer as 0.
## Project Structure
<img src="https://github.com/user-attachments/assets/4074f8b6-5865-4ef4-b580-5bedecbffd68" alt="Html project structure" style="width:80%">

## watch.js file variable and method structure

```java script
# variable delaration
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
  //logic to start the timer
}

function stop() {
  logic to stop the timer
}

function reset() {
  //logic to reset the timer
}

function updateTime() {
  //logic to update the timer
}

```
## Technologies Used
- **HTML**: Structure of the app.
- **CSS**: Styling the app, including digital clock-like font.
- **JavaScript**: Functionality for starting, stopping, and resetting the timer.
- **Bootstrap**: CSS framework for responsive design.
- **GitHub Pages**: Hosting the app.

## Acknowledgments
- The `Digital-7` font used in the app for the timer display.
- Bootstrap for providing responsive design components.
- Font Awesome for the start, stop, and reset icons.
