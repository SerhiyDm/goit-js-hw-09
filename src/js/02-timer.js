import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from "notiflix";


const refs = {
    body: document.querySelector('body'),
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
   daysUI: document.querySelector('[data-days]'),
   hoursUI: document.querySelector('[data-hours]'),
minutesUI: document.querySelector('[data-minutes]'),
    secondsUI: document.querySelector('[data-seconds]'),
}

const labelUI = document.querySelectorAll('.label');
const body = refs.body;
const inputField = refs.input;
const button = refs.startBtn;
button.disabled = true;
 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: 'd/ m/ Y  H:i',
    onChange(selectedDates) {
        const finalTime = selectedDates[0].getTime();
        const currentTime = Date.now();
        const difference = finalTime - currentTime;
        if(difference <= 10000) {
           Notify.failure("Please choose a date in the future", {
            position: 'center-center',
            width: '50vw',
            fontSize: '36px',
            backOverlay: true,
            backOverlayColor: 'rgba(0,0,0,0.9)',
            clickToClose: true,
           });
        } else {
            button.disabled = false;
        };
    },
    onClose(selectedDates) {
       const finalTime = selectedDates[0].getTime();
        const currentTime = Date.now();
        const difference = finalTime - currentTime;
        if (difference > 10000) {
            button.addEventListener('click', startTimer(finalTime));
};
},
  };

  flatpickr(inputField, options);

function startTimer(value) {
      const intId = setInterval(() => {
        refs.input.disabled = true;
        pointsMaker ();
       
        button.disabled = true;
   const currentTime = Date.now();
   const difference = value - currentTime;
   if(difference < 1000) {
    stopTimer(intId);
 }
 const timeComponents = convertMs(difference);
 changeValueUI(timeComponents);
   }, 1000);
      }

function addLeadingZero(value){
        return String(value).padStart(2, '0');
      }

      function stopTimer (v) {
        clearInterval(v);
        body.classList.add('bckg');
          }
        
        function changeValueUI (o) {
        refs.secondsUI.textContent = `${o.seconds}`;
        refs.minutesUI.textContent = `${o.minutes}`;
        refs.hoursUI.textContent = `${o.hours}`;
        refs.daysUI.textContent = `${o.days}`;
        
        }
        
        function pointsMaker () {
            for (let i = 0; i < labelUI.length; i++) {
                const e = labelUI[i];
                if(i >= labelUI.length - 1) {
                e.textContent = '';
            } else e.textContent = ':';
             e.classList.add('value');
          
            }
        }

      function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
