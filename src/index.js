import './styles.scss';

import EmailsInput, { EMAIL_STATUSES } from './emails-input';
const emailsInput = EmailsInput(document.getElementById('emails'), {
  onChange: (event, value) => console.log({ event, value })
});

document.getElementById('btnAddEmail').addEventListener('click', () => {
  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(999));
  }
  emailsInput.addEmails([`random${getRandomInt()}@veryrandom.com`]);
});
document.getElementById('btnEmailCount').addEventListener('click', () => {
  const emails = emailsInput.getState();
  const validCount = emails.reduce((count, email) => {
    if (email.status === EMAIL_STATUSES.VALID) {
      count++;
    }
    return count;
  }, 0);
  window.alert(validCount);
});
// btnEmailCount

// document.addEventListener()
// console.log({ input });

// const test = document.getElementById('test');
// console.log(test);
// test.addEventListener('click', () =>
//   input.replaceAll(['asdd', 'wqe@add.com', 'wqe@ss', '45423@ua.com'])
// );
// test.onclcik = () => {
//   console.log('asdasdasdasd');
// };
