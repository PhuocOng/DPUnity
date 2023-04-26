const form = document.querySelector('form');
const validationMessage = document.querySelector('#validation-message');
const button = document.querySelector('.custom-btn');


button.addEventListener('click', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    validationMessage.innerHTML = 'Please fill out all required fields.';
  } else {
    validationMessage.innerHTML = '';
  }
});
