import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formData = document.querySelector('.form');

const inputDelay = document.querySelector('[name="delay"]');

formData.addEventListener('submit', getPromise);

function getPromise(e) {
  e.preventDefault();

  const value = formData.elements.state.value;
  const delay = Number(inputDelay.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(res => {
      iziToast.success({
        icon: false,
        message: `✅ Fulfilled promise in ${res}ms`,
        position: 'topRight',
        progressBar: false,
      });
    })
    .catch(error => {
      iziToast.error({
        icon: false,
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
        progressBar: false,
      });
    });
  formData.reset();
}
