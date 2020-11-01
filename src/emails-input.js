import './emails-input.scss';

const isEmailValid = (email) => {
  return /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(
    email
  );
};

let areGlobalHandlersAttached = false;

const initContainer = (root) => {
  const container = document.createElement('div');
  container.classList.add('emails-input');
  container.state = { emails: [] };
  container.addEventListener('click', ({ target }) => {
    if (target.classList.contains('emails-input__remove-tag')) {
      // normally you would do target.parentElement.remove but it doesn't work in IE.
      target.parentElement.parentElement.removeChild(target.parentElement);
    }
  });
  container.innerHTML = `<input type="text" class="emails-input__input" placeholder="add more people..." />`;
  root.appendChild(container);
  return container;
};

const render = ({ container, input }, newEmails) => {
  container.state.emails = container.state.emails.concat(newEmails);
  newEmails.forEach((email) => {
    const emailContainer = document.createElement('div');
    emailContainer.classList.add(
      'emails-input__tag',
      `emails-input__tag--${email.status}`
    );
    emailContainer.innerHTML = `
      <span>${email.value}</span>
      <span class="emails-input__remove-tag">x</span>
    `;
    container.insertBefore(emailContainer, input);
  });
};

const isEmailsInput = (element) =>
  element.classList.contains('emails-input__input');

const getEmailObj = (value) => {
  // I tend to use strings over boolean because it's easier to extend later.
  // for instance if we want to later keep track of duplicated emails and style them differently
  const status = isEmailValid(value) ? 'valid' : 'invalid';
  return { value, status };
};

const handleKeyPress = (event) => {
  const input = event.target;
  if (
    isEmailsInput(input) &&
    (event.charCode === 44 || event.charCode === 13)
  ) {
    event.preventDefault();
    if (!input.value.trim().replace(/,/g, '')) {
      return;
    }

    const container = input.parentElement;
    render({ container, input }, [getEmailObj(input.value)]);
    input.value = '';
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

function EmailsInput(root, options) {
  initContainer(root);
  if (!areGlobalHandlersAttached) {
    document.addEventListener('keypress', handleKeyPress);
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
