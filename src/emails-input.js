import './emails-input.scss';

const isEmailValid = (email) => {
  return /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(
    email
  );
};

let areGlobalHandlersAttached = false;

const getContainer = () => {
  const container = document.createElement('div');
  container.classList.add('emails-input');
  container.state = { emails: [] };
  container.addEventListener('click', ({ target }) => {
    if (target.classList.contains('emails-input__remove-tag')) {
      // normally you would do target.parentElement.remove but it doesn't work in IE.
      target.parentElement.parentElement.removeChild(target.parentElement);
    }
  });
  return container;
};

const render = (container, root, focus = true) => {
  if (!root) {
    root = container.parentElement;
  }
  let emailsTmpl = container.state.emails.reduce((tmpl, email) => {
    tmpl += `
      <div class="emails-input__tag ${
        email.status === 'invalid' ? 'emails-input__tag--invalid' : ''
      }">
      
        <span>${email.value}</span>
        <span class="emails-input__remove-tag">x</span>
      </div>
    `;
    return tmpl;
  }, '');
  emailsTmpl += `<input type="text" class="emails-input__input" placeholder="add more people..." />`;
  container.innerHTML = emailsTmpl;
  root.innerHTML = '';
  root.appendChild(container);
  const [input] = container.getElementsByClassName('emails-input__input');
  if (focus) {
    input.focus();
  }
};

const isEmailsInput = (element) =>
  element.classList.contains('emails-input__input');
const getEmailObj = (value) => {
  const status = isEmailValid(value) ? 'valid' : 'invalid';
  return { value, status };
};

const handleKeyPress = (event) => {
  if (
    isEmailsInput(event.target) &&
    (event.charCode === 44 || event.charCode === 13)
  ) {
    const input = event.target;
    const container = input.parentElement;
    event.preventDefault();
    const { emails } = container.state;
    emails.push(getEmailObj(input.value));
    input.value = '';
    render(container);
    input.focus();
  }
};

const handlePaste = (event) => {
  const input = event.target;
  if (isEmailsInput(input)) {
    const container = input.parentElement;
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    if (paste) {
      console.log({
        paste,
        container,
        res: container.state.emails.concat(
          paste.split(',').map((val) => val.trim())
        )
      });
      container.state.emails = container.state.emails.concat(
        paste.split(',').map((val) => getEmailObj(val.trim()))
      );
      render(container);
      event.preventDefault();
    }
  }
};

function EmailsInput(root, options) {
  const container = getContainer();
  if (!areGlobalHandlersAttached) {
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('paste', handlePaste);
    areGlobalHandlersAttached = true;
  }

  render(container, root, false);
  return {
    replaceAll: (emails) => {},
    getEmails: () => {}
  };
}

export default EmailsInput;
