const form = document.querySelector('form');
const validationMessage = document.querySelector('#validation-message');
const button = document.querySelector('.custom-btn');


button.addEventListener('click', (event) => {

  if (!form.checkValidity()) {  //If users didn't completely fill the form, then we don't allow them to submit
    event.preventDefault();
    validationMessage.innerHTML = 'Please fill out all required fields.';
  } else {
    validationMessage.innerHTML = '';
  }
});
