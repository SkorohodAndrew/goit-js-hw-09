import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let startTime = Date.now();
let intervalID = null;
let sameData;

refs.startBtn.addEventListener('click', startTimer);
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: startTime,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= startTime) {
      window.alert('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', false);
    } else {
      refs.startBtn.removeAttribute('disabled', false);
    }
    return (sameData = selectedDates[0].getTime());
  },
};

flatpickr(refs.input, options);

function startTimer() {
  intervalID = setInterval(() => {
    const time = Date.now();
    const currentTime = sameData - time;
    if (currentTime <= 0) {
      return;
    }
    const timeComponents = convertMs(currentTime);
    console.log(timeComponents);

    refs.day.textContent = pad(convertMs(currentTime).days);
    refs.hours.textContent = pad(convertMs(currentTime).hours);
    refs.minutes.textContent = pad(convertMs(currentTime).minutes);
    refs.seconds.textContent = pad(convertMs(currentTime).seconds);
  }, 1000);
  stopTimer();
}

function stopTimer() {
  if (Date.parse(refs.input.value) <= 0) {
    clearInterval(timerId);
  }
}

function pad(value) {
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
