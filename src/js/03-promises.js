const refs = {
  form: document.querySelector('.form'),
  valueDelay: document.querySelector('input[name=delay]'),
  valueStep: document.querySelector('input[name=step]'),
  valueAmount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener('submit', createPromise);

function onFormSubmit(evt) {
  evt.preventDefault();

  const delay = refs.valueDelay.value;
  const step = refs.valueStep.value;
  const amount = refs.valueAmount.value;

  createPromise(2, 1500)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    const step = refs.valueStep.value;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}
