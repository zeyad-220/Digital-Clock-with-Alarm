const clockElement = document.getElementById('clock');
const alarmList = document.getElementById('alarm-list');
const alarmInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const alarmSound = document.getElementById('alarm-sound');
let alarms = [];

const stopwatchElement = document.getElementById('stopwatch');
const startStopwatchBtn = document.getElementById('start-stopwatch-btn');
const stopStopwatchBtn = document.getElementById('stop-stopwatch-btn');
const resetStopwatchBtn = document.getElementById('reset-stopwatch-btn');
let stopwatchTime = 0;
let stopwatchInterval = null;

const timerElement = document.getElementById('timer');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const startTimerBtn = document.getElementById('start-timer-btn');
const stopTimerBtn = document.getElementById('stop-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');
let timerTime = 0;
let timerInterval = null;

function updateClock() {
  const now = new Date();
  clockElement.textContent = now.toTimeString().split(' ')[0];
  alarms.forEach((alarm, index) => {
    if (alarm === now.toTimeString().substring(0, 5)) {
      alarmSound.play();
      alert(\`Alarm: \${alarm}\`);
      alarms.splice(index, 1);
      renderAlarms();
    }
  });
}

function setAlarm() {
  const alarmTime = alarmInput.value;
  if (alarmTime && !alarms.includes(alarmTime)) {
    alarms.push(alarmTime);
    renderAlarms();
  }
}

function renderAlarms() {
  alarmList.innerHTML = '';
  alarms.forEach((alarm) => {
    const listItem = document.createElement('li');
    listItem.classList.add('alarm-item');
    listItem.innerHTML = \`
      <span>\${alarm}</span>
      <button onclick="removeAlarm('\${alarm}')">Remove</button>
    \`;
    alarmList.appendChild(listItem);
  });
}

function removeAlarm(alarm) {
  alarms = alarms.filter((a) => a !== alarm);
  renderAlarms();
}

function startStopwatch() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopwatchTime = 0;
  updateStopwatch();
  stopStopwatch();
}

function updateStopwatch() {
  const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  const seconds = String(stopwatchTime % 60).padStart(2, '0');
  stopwatchElement.textContent = \`\${hours}:\${minutes}:\${seconds}\`;
}

function startTimer() {
  const minutes = parseInt(timerMinutesInput.value) || 0;
  const seconds = parseInt(timerSecondsInput.value) || 0;
  timerTime = minutes * 60 + seconds;

  if (timerTime > 0 && !timerInterval) {
    timerInterval = setInterval(() => {
      if (timerTime <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Timer finished!');
      } else {
        timerTime--;
        updateTimer();
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timerTime = 0;
  updateTimer();
}

function updateTimer() {
  const minutes = String(Math.floor(timerTime / 60)).padStart(2, '0');
  const seconds = String(timerTime % 60).padStart(2, '0');
  timerElement.textContent = \`\${minutes}:\${seconds}\`;
}

setInterval(updateClock, 1000);
setAlarmBtn.addEventListener('click', setAlarm);
startStopwatchBtn.addEventListener('click', startStopwatch);
stopStopwatchBtn.addEventListener('click', stopStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);
startTimerBtn.addEventListener('click', startTimer);
stopTimerBtn.addEventListener('click', stopTimer);
resetTimerBtn.addEventListener('click', resetTimer);
