import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
let userSelectedDate = null;
let timeInterval;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.error({ message: 'Please choose a date in the future' });
      button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr(input, options);

function start() {
  button.disabled = true;
  input.disabled = true;
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    const time = userSelectedDate - Date.now();
    if (time <= 0) {
      clearInterval(timeInterval);
      iziToast.success({ message: "Time's up!" });
      input.disabled = false;
      button.disabled = true;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(time);
    spanDays.textContent = addStringTimer(days);
    spanHours.textContent = addStringTimer(hours);
    spanMinutes.textContent = addStringTimer(minutes);
    spanSeconds.textContent = addStringTimer(seconds);
  }, 1000);
}

function addStringTimer(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

button.addEventListener('click', start);
