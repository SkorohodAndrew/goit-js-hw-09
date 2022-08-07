import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  valueDelay: document.querySelector('input[name=delay]'),
  valueStep: document.querySelector('input[name=step]'),
  valueAmount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delay = refs.valueDelay.value;
  const amount = refs.valueAmount.value;
  const step = refs.valueStep.value;

  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    const newDelay = i * step + +delay;
    setTimeout(() => {
      createPromise(position, newDelay)
        .then(value => {
          Notiflix.Notify.success(`${value}`);
        })
        .catch(error => {
          Notiflix.Notify.failure(`${error}`);
        });
    }, step * i);
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const step = refs.valueStep.value;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, step);
  });
}
