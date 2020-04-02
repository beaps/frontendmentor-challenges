const form = document.querySelector('#form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const inputs = document.querySelectorAll('#form input');

const head = document.querySelector('head');

let stylesheet = document.styleSheets[0];
console.log('styleSHEET', stylesheet);
// console.log('styleSHEET', head.children[5].sheet.cssRules);

var style = document.createElement("style");
document.head.appendChild(style);

function addIconError(element) {
  // style.insertAdjacentHTML(
  // // head.children[5].insertAdjacentHTML(
  //   'beforeend',
  //   `
  //   .div-${element.id}::after {
  //     content: '';
  //     background-image: url('./images/icon-error.svg');
  //     width: 1.3em;
  //     height: 1.3em;
  //     background-size: 1.3em;
  //     position: absolute;
  //     top: 0.8em;
  //     right: 1.5em;
  //   }
  //   `
  // );

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

let iconsCssRules = {
  'First Name': 3,
  'Last Name': 1,
  'Email Address': 2,
  'Password': 0
}

function removeIconError(element) {
  // console.log('index rule', iconsCssRules[element.placeholder])
  // style.sheet.deleteRule(iconsCssRules[element.placeholder]);
  // stylesheet.deleteRule(iconsCssRules[element.placeholder]);

  console.log('longitud', style.sheet.cssRules.length);
  let cssRulesLength = style.sheet.cssRules.length;
  
  if (cssRulesLength > 0) {
    // for (let index = 0; index < cssRulesLength; index++) {
    //   style.sheet.deleteRule(index);
    // }
    console.log('indice', iconsCssRules[element.placeholder])
    style.sheet.deleteRule(iconsCssRules[element.placeholder]);
  }

  // style.sheet.cssRules = {};
  
  // style.remove();

  // style.sheet.disabled = true;
}


console.log(head.children[5]);


console.log(inputs)




function handleEmpty(element) {
  // Remove the error to avoid repeating the message
  const error = document.querySelector(`#${element.id} + p`);
  if (error) {
    error.remove();
    removeIconError(element);
  }

  console.log(element);
  if (!element.value) {
    addIconError(element);
    element.insertAdjacentHTML(
      'afterend',
      `<p class="form__error">${element.placeholder} cannot be empty</p>`
    );
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // removeIconError();
  inputs.forEach(input => {
    handleEmpty(input);
  })
});