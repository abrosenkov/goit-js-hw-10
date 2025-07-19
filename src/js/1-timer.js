import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');

const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[type="button"]');

startButton.disabled = true;
startButton.style.cursor = 'not-allowed';

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();

    userSelectedDate = selectedDates[0];

    if (userSelectedDate < date) {
      startButton.disabled = true;
      startButton.style.cursor = 'not-allowed';
      iziToast.show({
        title: '',
        color: 'red',
        messageSize: '18',
        class: '.iziToast-custom-message',
        position: 'topRight',
        message: `<span class="message-icon">⮾</span>Please choose a date in the future`,
      });
    } else {
      startButton.disabled = false;
      startButton.style.cursor = 'pointer';
    }
  },
};

function addLeadingZero(value) {
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

startButton.addEventListener('click', reverseCountInterval);

function reverseCountInterval() {
  const indexInterval = setInterval(() => {
    const allMs = userSelectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(allMs);

    if (allMs <= 0) {
      clearInterval(indexInterval);
      inputDate.disabled = false;
      startButton.disabled = false;

      inputDate.style.cursor = 'pointer';
      startButton.style.cursor = 'pointer';
      iziToast.show({
        title: '',
        color: 'green',
        messageSize: '18',
        class: '.iziToast-custom-message',
        position: 'topRight',
        message: `<span class="message-icon message-icon-ok">☑</span>Finished`,
      });
      return;
    }

    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
  }, 1000);

  inputDate.disabled = true;
  startButton.disabled = true;

  inputDate.style.cursor = 'not-allowed';
  startButton.style.cursor = 'not-allowed';
}

flatpickr(inputDate, options);
