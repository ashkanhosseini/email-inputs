import './emails-input.scss';

// useing the CustomEvent constructor is not working in IE11. We could polyfill it
const onChangeEvent = document.createEvent('CustomEvent');
onChangeEvent.initEvent('emailsInput.change', true, false);

const isEmailValid = (email) => {
  return /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(
    email
  );
};

let areGlobalHandlersAttached = false;

const getInput = () => {
  const input = document.createElement('input');
  input.className = 'emails-input__input';
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'add more people...');
  input.onblur = handleBlur;
  return input;
};

const isEmailsInput = (element) =>
  element.className.includes('emails-input__input');

const getEmailObj = (value) => {
  // I tend to use strings over boolean because it's easier to extend later.
  // for instance if we want to later keep track of duplicated emails and style them differently
  const status = isEmailValid(value) ? 'valid' : 'invalid';
  return { value, status };
};

const handleInputValue = (input) => {
  if (!input.value.trim().replace(/,/g, '')) {
    return;
  }

  const container = input.parentElement;
  render({ container, input }, [getEmailObj(input.value)]);
  input.value = '';
};

const handleKeyPress = (event) => {
  const input = event.target;
  if (
    isEmailsInput(input) &&
    (event.charCode === 44 || event.charCode === 13)
  ) {
    event.preventDefault();

    handleInputValue(input);
  }
};

const handleBlur = (event) => {
  const input = event.target;
  if (isEmailsInput(input)) {
    handleInputValue(input);
  }
};

const handlePaste = (event) => {
  const input = event.target;
  if (isEmailsInput(input)) {
    const container = input.parentElement;
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    if (paste) {
      event.preventDefault();
      const pastedEmails = paste
        .split(',')
        .map((val) => getEmailObj(val.trim()));
      render({ container, input }, pastedEmails);
    }
  }
};

const initContainer = (root) => {
  const container = document.createElement('div');
  container.className = 'emails-input';
  container.state = { emails: [] };
  container.addEventListener('click', ({ target }) => {
    if (target.className.includes('emails-input__remove-tag')) {
      // normally you would do target.parentElement.remove but it doesn't work in IE.
      target.parentElement.parentElement.removeChild(target.parentElement);
    }
  });
  const input = getInput();
  container.appendChild(input);
  root.appendChild(container);
  return container;
};

const render = ({ container, input }, newEmails) => {
  container.state.emails = container.state.emails.concat(newEmails);
  container.dispatchEvent(onChangeEvent);
  newEmails.forEach((email) => {
    const emailContainer = document.createElement('div');
    emailContainer.className = `emails-input__tag emails-input__tag--${email.status}`;
    emailContainer.innerHTML = `
      <span>${email.value}</span>
      <span class="emails-input__remove-tag">x</span>
    `;
    container.insertBefore(emailContainer, input);
  });
};

function EmailsInput(root, options = {}) {
  const container = initContainer(root);
  if (options.onChange) {
    container.addEventListener('emailsInput.change', (event) => {
      options.onChange(event, container.state.emails);
    });
  }

  if (!areGlobalHandlersAttached) {
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('blur', handleBlur);
    document.addEventListener('paste', handlePaste);
    areGlobalHandlersAttached = true;
  }

  // render(container, root, false);
  return {
    replaceAll: (emails) => {},
    getEmails: () => {}
  };
}

export default EmailsInput;
