import './styles.scss';

import EmailsInput, { EMAIL_STATUSES } from './emails-input';
const emailsInput = EmailsInput(document.getElementById('emails'));

document.getElementById('btnAddEmail').addEventListener('click', () => {
  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(999));
  }
  emailsInput.addEmails([`ran${getRandomInt()}@dom.com`]);
});

document.getElementById('btnEmailCount').addEventListener('click', () => {
  const emails = emailsInput.getState();
  const validCount = emails.reduce((count, email) => {
    if (email.status === EMAIL_STATUSES.VALID) {
      count++;
    }
    return count;
  }, 0);
  window.alert(`The number of valid emails is: ${validCount}`);
});
