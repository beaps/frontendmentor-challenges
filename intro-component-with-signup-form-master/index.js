const form = document.querySelector('#form');
const email = document.querySelector('#email');
const inputs = document.querySelectorAll('#form input');
const head = document.querySelector('head');
// let stylesheet = document.styleSheets[0];
const style = document.createElement('style');
document.head.appendChild(style);

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
}

function addError(element) {
  if (!element.value) {
    addIconError(element);
    element.insertAdjacentHTML(
      'afterend',
      `<p class="form__error">${element.placeholder} cannot be empty</p>`
    );
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