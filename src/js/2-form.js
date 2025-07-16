const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const DATA_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const dataObj = localStorage.getItem(DATA_KEY);

if (dataObj) {
  formData = JSON.parse(dataObj);
  emailInput.value = formData.email.trim();
  messageInput.value = formData.message.trim();
}

form.addEventListener('input', () => {
  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();
  localStorage.setItem(DATA_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!emailInput.value || !messageInput.value) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.clear();
  form.reset();
});
