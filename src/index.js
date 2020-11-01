import './styles.scss';

import EmailsInput from './emails-input';
const input = EmailsInput(document.getElementById('emails'), {
  onChange: (event, value) => console.log({ event, value })
});
// console.log({ input });

// const test = document.getElementById('test');
// console.log(test);
// test.addEventListener('click', () =>
//   input.replaceAll(['asdd', 'wqe@add.com', 'wqe@ss', '45423@ua.com'])
// );
// test.onclcik = () => {
//   console.log('asdasdasdasd');
// };
