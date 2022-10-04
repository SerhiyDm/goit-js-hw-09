import { Notify } from "notiflix";
import {promiseSectionOptions} from './notify-options';
const refs = { 
button: document.querySelector('[type="submit"]'),
form: document.querySelector('.form'),
};
const formElements = refs.form.elements;


refs.button.addEventListener('click', startPromiseCreating);


function startPromiseCreating (e) {
   e.preventDefault();
  let d = formElements.delay.value;
  let s = formElements.step.value;
  let a = formElements.amount.value;
  let p = 0;
  d = Number(d);
  s = Number(s);
  a = Number(a);
  if (d < 0 || s < 0 || a <= 0) {
    Notify.warning('The number entered must be positive or zero* !', {
      cssAnimationStyle: 'from-left',
    position: 'center-top',
  fontSize: '34px',
  width: '50vw',
  warning: {
    textColor: '#000', 
},
  }); 
  return;
}
const elements = {d, s, a, p};
dataBandler(elements);
}


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  })
}
function dataBandler ({d, s, a, p}) {
  for (let i = 0; i < a; i++) {
    if (i >= 1) {
     d += s;
    }
    p = i + 1;
     setTimeout((p, d) => {
       createPromise(p, d).then(({ position, delay }) => {
        
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, promiseSectionOptions);
       }).catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, promiseSectionOptions);
     });
      },d, p, d)
   }
}
const x = document.querySelector('#NotiflixNotify');
console.log(x);