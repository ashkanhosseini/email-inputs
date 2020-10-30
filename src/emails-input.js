import './emails-input.scss';

const isEmailValid = (email) => {
  return /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(
    email
  );
};

let isKeypressAttached = false;

const getTextInput = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'add more people...');
  input.classList.add('emails-input__input');
  return input;
};

const getContainer = () => {
  const container = document.createElement('div');
  container.classList.add('emails-input');
  container.state = { emails: [] };
  return container;
};

function EmailsInput(node, options) {
  const container = getContainer();
  // const input = getTextInput();
  // let emails = [];
  if (!isKeypressAttached) {
    document.addEventListener('keypress', (event) => {
      if (
        event.target.classList.contains('emails-input__input') &&
        (event.charCode === 44 || event.charCode === 13)
      ) {
        const input = event.target;
        event.preventDefault();
        const { emails } = container.state;
        const status = isEmailValid(input.value) ? 'valid' : 'invalid';
        emails.push({ value: input.value, status });
        input.value = '';
        render();
        // container.dataset['state'] = emails;
        // container.insertBefore()
        input.focus();
      }
    });
    isKeypressAttached = true;
  }

  const render = () => {
    console.log({ emails: container.state.emails });
    let emailsTmpl = container.state.emails.reduce((tmpl, email) => {
      tmpl += `
        <div class="emails-input__tag ${
          email.status === 'invalid' ? 'emails-input__tag--invalid' : ''
        }">
          ${email.value}
        </div>
      `;
      return tmpl;
    }, '');
    emailsTmpl += `<input type="text" class="emails-input__input" placeholder="add more people..." />`;
    console.log({ emailsTmpl });
    container.innerHTML = emailsTmpl;
    node.innerHTML = '';
    node.appendChild(container);
    const [input] = container.getElementsByClassName('emails-input__input');
    input.focus();
    // const elements = container.state.emails.reduce((acc, email) => {
    //   const el = document.createElement('div');
    //   el.classList.add('emails-input__tag');
    //   el.innerText = email.value;
    //   if (email.status !== 'valid') {
    //     el.classList.add('emails-input__tag--invalid');
    //   }
    //   acc.push(el);
    //   return acc;
    // }, []);
    // elements.push(input);
    // container.replaceChildren(...elements);
    // node.replaceChildren(container);
  };

  render();
  return {
    replaceAll: (emails) => {},
    getEmails: () => {}
  };
}

export default EmailsInput;
