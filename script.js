const settingsBtn = document.querySelector('.settings-btn');
const settingsContainer = document.querySelector(
  '.settings-container'
);
const closeBtn = document.querySelector('.close-btn');
const main = document.getElementsByTagName('body')[0];
const nav = document.querySelector('.nav');
const switchTimer = document.querySelector('.switch');
const toggleBtns = document.querySelectorAll('.nav-btn');
let time = document.querySelector('.time');
const contolBtn = document.querySelector('.control');
const bell = document.querySelector('audio');

const fonts = document.querySelector('.fonts');
const fontButtons =
  document.querySelectorAll('.font-input');
const colors = document.querySelector('.colors');
const colorButtons =
  document.querySelectorAll('.color-input');

const applyBtn = document.querySelector('.apply');

let pValue, sValue, lValue, mins, secs, ff, cc, font, color;
let interval = -1;
let restart = false;
let root = document.querySelector(':root');
let gcs = getComputedStyle(root);

nav.addEventListener('click', toggle);
settingsBtn.addEventListener('click', openSettings);
closeBtn.addEventListener('click', closeSettings);
applyBtn.addEventListener('click', setAndCloseSettings);
contolBtn.addEventListener('click', checkSwitchTimer);

window.addEventListener('load', setSettings);

function setSettings() {
  pValue = document
    .querySelector('.pd')
    .value.padStart(2, 0);
  sValue = document
    .querySelector('.s')
    .value.padStart(2, 0);
  lValue = document
    .querySelector('.l')
    .value.padStart(2, 0);

  font = gcs
    .getPropertyValue('--font')
    .split(',')
    .slice(0, 1)
    .join('');
  color = gcs
    .getPropertyValue('--color')
    .split(',')
    .slice(0, 1)
    .join('');

  checkAndDisplayTime();
}

function setAndCloseSettings() {
  setSettings();
  setFont(font);
  setColor(color);
  closeSettings();
}

function toggle(e) {
  if (interval == -1) {
    toggleBtns.forEach((btn) =>
      btn.classList.remove('toggle')
    );
    if (e.target.classList.contains('nav-btn')) {
      let tab = e.target.id;
      switchTimer.style.transform = `translate(${
        tab * 100
      }%,0)`;
      e.target.classList.add('toggle');
      checkAndDisplayTime();
      contolBtn.textContent = 'start';
      restart = false;
    }
  } else {
    showError();
  }
}

function showError() {
  main.classList.add('show');
  setTimeout(() => {
    main.classList.remove('show');
  }, 3000);
}

function checkAndDisplayTime() {
  let activeSwitch =
    document.querySelector('.toggle').classList[1];
  if (activeSwitch == 'pomodoro') displayTime(pValue);
  if (activeSwitch == 'sb') displayTime(sValue);
  if (activeSwitch == 'lb') displayTime(lValue);
}

function checkSwitchTimer() {
  let activeSwitch =
    document.querySelector('.toggle').classList[1];

  if (restart) {
    if (activeSwitch == 'pomodoro')
      startTimer(time.textContent);

    if (activeSwitch == 'sb') startTimer(time.textContent);

    if (activeSwitch == 'lb') startTimer(time.textContent);
  } else {
    if (activeSwitch == 'pomodoro')
      startTimer(time.textContent);

    if (activeSwitch == 'sb') startTimer(time.textContent);

    if (activeSwitch == 'lb') startTimer(time.textContent);
  }
}

function startTimer(value) {
  [mins] = value.split(':').slice(0, 1);
  secs = value.split(':').pop();
  if (interval == -1) {
    contolBtn.textContent = 'pause';
    interval = setInterval(() => {
      if (mins == 0 && secs == 0) {
        contolBtn.textContent = 'restart';
        displayTime(mins, secs);
        clearInterval(interval);
        restart = true;
        interval = -1;
        setSettings();
        bell.play();
      } else if (secs == 0) {
        mins--;
        secs = 59;
        displayTime(mins, secs);
      } else if (secs > 0) {
        secs--;
        displayTime(mins, secs);
      }
    }, 200);
  } else {
    clearInterval(interval);
    contolBtn.textContent = 'start';
    interval = -1;
    restart = false;
  }
}

function displayTime(mins, secs = 0) {
  secs = secs.toString().padStart(2, 0);
  time.innerHTML = `${mins
    .toString()
    .padStart(2, 0)}:${secs}`;
}

function openSettings() {
  interval == -1
    ? main.classList.add('active')
    : showError();
}

function closeSettings(e) {
  if (main.classList.contains('active'))
    main.classList.remove('active');
}

fonts.addEventListener('click', function (e) {
  fontButtons.forEach((btn) => {
    btn.classList.remove('active-font');
    if (e.target.classList.contains('font-input')) {
      e.target.classList.add('active-font');
      ff = e.target.id;
    }
  });
});

function setFont(font) {
  ff
    ? root.style.setProperty('--font', ff)
    : root.style.setProperty('--font', font);
}

colors.addEventListener('click', function (e) {
  colorButtons.forEach((btn) => {
    btn.classList.remove('active-color');
    if (e.target.classList.contains('color-input')) {
      e.target.classList.add('active-color');
      cc = e.target.id;
    }
  });
});

function setColor(color) {
  cc
    ? root.style.setProperty('--color', cc)
    : root.style.setProperty('--color', color);
}
