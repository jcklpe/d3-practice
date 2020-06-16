//- scss injection
import "./styles.scss";

//ui selector variables
const timerDisplay = document.querySelector(`.time-display`);
const toggleButton = document.querySelector(`.toggle-timer`);
const resetButton = document.querySelector(`.reset-timer`);

// declare initial time variables
let now = 0;
let startTime = 0;
let timeElapsed = 0;
let pausedTime = 0;
let unpausedTime = 0;
let pauseIncrement = 0;
const totalPausedTimeArray = [];
let totalPausedTime = 0;
let seconds = 0;
let minutes = 0;

// declare initial display content
let content = `0:00.00`;

// declare initial isState
let isInitialState = toggleButton.classList.contains(`initial-state`);
let isRunning = toggleButton.classList.contains(`running`);
let isPaused = toggleButton.classList.contains(`paused`);

// utility functions
const sumArray = function(array) {
  return array.reduce(function(a, b) {
    return a + b;
  }, 0);
};

// stopwatch loop
function loop() {
  // update ui state
  isInitialState = toggleButton.classList.contains(`initial-state`);
  isRunning = toggleButton.classList.contains(`running`);
  isPaused = toggleButton.classList.contains(`paused`);

  //update time variables
  now = Date.now();

  if (isRunning) {
    timeElapsed = now - startTime - totalPausedTime;
    seconds = timeElapsed / 1000;
    seconds = (seconds % 60).toFixed(2);
    minutes = Math.floor(timeElapsed / 1000 / 60);
  }

  // render display content
  if (seconds < 9.99999) {
    content = `${minutes}:0${seconds}`;
  } else {
    content = `${minutes}:${seconds}`;
  }

  if (!isInitialState) {
    document.title = content;
    timerDisplay.innerHTML = content;
  } else {
    content = `0:00.00`;
    document.title = `Stopwatch`;
    timerDisplay.innerHTML = content;
  }

  requestAnimationFrame(loop);
}

//- button functions
// toggle time between 3 states of initial, running, and paused
function toggleTimer() {
  switch (true) {
    // if in intial state, start timer to run state, remove initial state, and log start time
    case isInitialState:
      startTime = Date.now();
      toggleButton.classList.add(`running`);
      toggleButton.classList.remove(`initial-state`);
      toggleButton.textContent = `Pause`;

      break;

    // if timer is currently running, pause timer, remove running, and save time to variable
    case isRunning:
      toggleButton.classList.add(`paused`);
      toggleButton.classList.remove(`running`);
      toggleButton.textContent = `Resume`;
      pausedTime = Date.now();

      break;

    // if timer is currently paused then start running state, remove paused, and update time variables
    case isPaused:
      toggleButton.classList.add(`running`);
      toggleButton.classList.remove(`paused`);
      toggleButton.textContent = `Pause`;
      unpausedTime = Date.now();
      pauseIncrement = unpausedTime - pausedTime;
      totalPausedTimeArray.push(pauseIncrement);
      totalPausedTime = sumArray(totalPausedTimeArray);

      break;

    default:
  }
}

//-

// revert to intitial state, and reset time variables
function resetTimer() {
  // reset to initial state
  toggleButton.classList.remove(`running`);
  toggleButton.classList.remove(`paused`);
  toggleButton.classList.add(`initial-state`);

  // reset time variables
  startTime = 0;
  timeElapsed = 0;
  pausedTime = 0;
  unpausedTime = 0;
  pauseIncrement = 0;
  totalPausedTimeArray.length = 0;
  totalPausedTime = 0;
  seconds = 0;
  minutes = 0;

  // reset ui content
  toggleButton.textContent = `Start`;
  content = `0:00.00`;
}

//- button event listeners
toggleButton.addEventListener(`click`, toggleTimer);
resetButton.addEventListener(`click`, resetTimer);

//- update time

requestAnimationFrame(loop);
