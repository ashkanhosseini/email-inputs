import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  getByPlaceholderText,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmailsInput from './emails-input';

const render = () => {
  const root = document.createElement('div');
  // root.setAttribute('')
  document.body.append(root);
  return { container: document.body, emailsInput: EmailsInput(root) };
};

const keyStrokesThatCreateBlocks = [',', '{enter}'];

describe('EmailsInput', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  keyStrokesThatCreateBlocks.forEach((key) => {
    it(`should create an email block when user hits "${key}"`, () => {
      const { container } = render();
      const input = getByPlaceholderText(container, /add more people/i);
      const invalidEmail = 'blahblah';
      const validEmail = 'validemail@gmail.com';
      expect(input).toBeVisible();

      userEvent.type(input, invalidEmail + key);
      expect(input.value).toBe('');
      expect(getByText(container, invalidEmail));

      userEvent.type(input, validEmail + key);
      expect(input.value).toBe('');
      expect(getByText(container, validEmail));

      expect(container.querySelectorAll('.emails-input__tag')).toHaveLength(2);
      expect(
        container.querySelectorAll('.emails-input__tag--invalid')
      ).toHaveLength(1);
      expect(
        container.querySelectorAll('.emails-input__tag--valid')
      ).toHaveLength(1);
    });
  });

  it(`should create an email block when input looses focus`, () => {
    const { container } = render();
    const input = getByPlaceholderText(container, /add more people/i);
    const invalidEmail = 'blahblah';
    const validEmail = 'validemail@gmail.com';
    expect(input).toBeVisible();

    userEvent.type(input, invalidEmail);
    userEvent.tab();
    expect(input.value).toBe('');
    expect(getByText(container, invalidEmail));

    userEvent.type(input, validEmail);
    userEvent.tab();
    expect(input.value).toBe('');
    expect(getByText(container, validEmail));

    expect(container.querySelectorAll('.emails-input__tag')).toHaveLength(2);
    expect(
      container.querySelectorAll('.emails-input__tag--invalid')
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.emails-input__tag--valid')
    ).toHaveLength(1);
  });

  it('should be able to remove email blocks', () => {
    const { container, emailsInput } = render();
    const emails = ['valid@gmail.com', 'whatsup', 'amIvalid@somewhere.com'];
    emailsInput.addEmails(emails);

    expect(container.querySelectorAll('.emails-input__tag')).toHaveLength(3);
    expect(
      container.querySelectorAll('.emails-input__tag--invalid')
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.emails-input__tag--valid')
    ).toHaveLength(2);

    emails.forEach((email) => {
      const removeButton = getByLabelText(container, `remove ${email}`);
      userEvent.click(removeButton);
      expect(removeButton).not.toBeInTheDocument();
    });
    expect(container.querySelectorAll('.emails-input__tag')).toHaveLength(0);
    expect(
      container.querySelectorAll('.emails-input__tag--invalid')
    ).toHaveLength(0);
    expect(
      container.querySelectorAll('.emails-input__tag--valid')
    ).toHaveLength(0);
  });
});
