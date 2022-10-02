const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'), 
  btnStop: document.querySelector('[data-stop]'), 
}
refs.btnStart.addEventListener('click', onColorChange);
refs.btnStop.addEventListener('click', stopColorChange);
const btnStop = refs.btnStop;
const btnStart = refs.btnStart;
const bodyStyle = refs.body.style;
const CHANGE_DELAY = 1000;
let intervalId = null;

btnStop.disabled = true;

function onColorChange() {
    btnStart.disabled = true;
btnStop.disabled = false;
intervalId = setInterval(() => {
    bodyStyle.backgroundColor = `${getRandomHexColor()}`;
    }, CHANGE_DELAY)
}
function stopColorChange () {
    btnStart.disabled = false;
    btnStop.disabled = true;
clearInterval(intervalId);
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } 