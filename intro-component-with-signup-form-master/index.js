const form = document.querySelector('#form');
const inputs = document.querySelectorAll('#form input');
const style = document.createElement('style');
document.head.appendChild(style);
// let stylesheet = document.styleSheets[0];

function addIconError(element) {
  style.sheet.insertRule(
    `
    .div-${element.id}::after {
      content: '';
      background-image: url('./images/icon-error.svg');
      width: 1.3em;
      height: 1.3em;
      background-size: 1.3em;
      position: absolute;
      top: 0.8em;
      right: 1.5em;
    }
    `
  );
}

function removeIconError(element) {
  let cssRulesLength = style.sheet.cssRules.length;
  if (cssRulesLength > 0) {
    for (let index = 0; index < cssRulesLength; index++) {
      if (style.sheet.cssRules[index].selectorText === `.div-${element.id}::after`) {
        style.sheet.deleteRule(index);
        break;
      }
    }
  }
}

function deleteError(element) {
  // Remove the error to avoid repeating the message
  const error = document.querySelector(`#${element.id} + p`);
  if (error) {
    error.remove();
    removeIconError(element);
  }
  element.classList.remove('form__input--error');
}

function addTypeError(element, message) {
  addIconError(element);
  element.insertAdjacentHTML(
    'afterend',
    `<p class="form__error">${message}</p>`
  );
  element.classList.add('form__input--error');
}

function validateEmail(element) {
  if (
    element.id === 'email' &&
    !element.value.match(/^\"?[\w\.!#$%&'*+\-/=?^_`{|}~ ]{1,62}\"?@((\[.*\])|[\w\-]+\.?\w{2,10})$/i)
  ) {
    addTypeError(element, 'Looks like this is not an email');
  }
}

function addError(element) {
  if (!element.value) {
    addTypeError(element, `${element.placeholder} cannot be empty`);
  } else {
    validateEmail(element);
  }
}

function handleError(element) {
  deleteError(element);
  addError(element);  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  inputs.forEach(input => {
    handleError(input);
  })
});