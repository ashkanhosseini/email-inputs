import './styles.css';

import EmailsInput from './emails-input';
EmailsInput(document.getElementById('root'), {
  onChange: (event, value) => console.log({ event, value })
});
