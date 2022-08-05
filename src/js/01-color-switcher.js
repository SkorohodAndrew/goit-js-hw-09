function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', changeColor);

function changeColor() {
  refs.start.disabled = true;
  if ((refs.start.disabled = true)) {
    refs.stop.disabled = false;
  }

  const changeColorTime = setTimeout(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    changeColor();
  }, 1000);

  refs.stop.addEventListener('click', changeColorOff);

  function changeColorOff() {
    refs.stop.disabled = true;
    if ((refs.stop.disabled = true)) {
      refs.start.disabled = false;
    }
    clearTimeout(changeColorTime);
  }
}
