import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

const form = document.querySelector('.form');
const startBtn = document.querySelector('button');

function handleStart(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const choice = event.target.elements.state.value;
  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (choice === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    });
    promise
      .then(message => {
        iziToast.success({ message });
      })
      .catch(error => {
        iziToast.error({ message: error });
      });
  }, delay);
}

form.addEventListener('submit', handleStart);
