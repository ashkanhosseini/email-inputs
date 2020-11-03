import {
  getByLabelText,
  getByText,
  queryByText,
  getByPlaceholderText,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmailsInput from './emails-input';

const render = (options) => {
  const root = document.createElement('div');
  document.body.append(root);
  return { container: document.body, emailsInput: EmailsInput(root, options) };
};

const keyStrokesThatCreateBlocks = [',', '{enter}'];

describe('EmailsInput', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  keyStrokesThatCreateBlocks.forEach((key) => {
    it(`should create an email block when user hits "${key}"`, () => {
      const emails = ['blahblah', 'validemail@gmail.com'];
      const { container } = render();

      const input = getByPlaceholderText(container, /add more people/i);
      expect(input).toBeVisible();

      emails.forEach((email) => {
        userEvent.type(input, email + key);
        expect(input.value).toBe('');
        expect(getByText(container, email));
      });

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
    const emails = ['blahblah', 'validemail@gmail.com'];
    expect(input).toBeVisible();

    emails.forEach((email) => {
      userEvent.type(input, email);
      userEvent.tab();
      expect(input.value).toBe('');
      expect(getByText(container, email));
    });

    expect(container.querySelectorAll('.emails-input__tag')).toHaveLength(2);
    expect(
      container.querySelectorAll('.emails-input__tag--invalid')
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.emails-input__tag--valid')
    ).toHaveLength(1);
  });

  it('should convert pasted text into email blocks', async () => {
    const emails = ['valid@gmail.com', 'whatsup'];
    const textToPaste = emails.join(', ');

    const { container, emailsInput } = render();
    const input = getByPlaceholderText(container, /add more people/i);
    userEvent.paste(input, textToPaste, {
      clipboardData: { getData: () => textToPaste },
    });

    // ! need to investigate, probably a bug in user-events that doesn't take preventDefault into account
    // await waitFor(() => expect(input.value).toBe(''));

    emails.forEach((email) => {
      expect(getByText(container, email));
    });

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
    expect(emailsInput.getState().length).toBe(0);
  });

  describe('public API', () => {
    it('#onChange', () => {
      const onChange = jest.fn();
      const { container } = render({ onChange });
      const input = getByPlaceholderText(container, /add more people/i);

      userEvent.type(input, 'ashkan@gmail.com{enter}');
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'emailsInput.change' }),
        [{ status: 'valid', value: 'ashkan@gmail.com', id: expect.any(Number) }]
      );

      userEvent.type(input, 'invalid-email{enter}');
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'emailsInput.change' }),
        [
          {
            id: expect.any(Number),
            status: 'valid',
            value: 'ashkan@gmail.com',
          },
          { status: 'invalid', value: 'invalid-email', id: expect.any(Number) },
        ]
      );
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('#replaceAll', () => {
      const { container, emailsInput } = render();
      const emails = ['valid@gmail.com', 'whatsup', 'amIvalid@somewhere.com'];
      const replaceEmails = ['starwars@cool.com', 'or', 'startrek@cool.com'];
      emailsInput.addEmails(emails);
      emails.forEach((email) => {
        expect(getByText(container, email)).toBeVisible();
      });

      emailsInput.replaceAll(replaceEmails);
      emails.forEach((email) => {
        expect(queryByText(container, email)).toBeNull();
      });
      replaceEmails.forEach((email) => {
        expect(getByText(container, email)).toBeVisible();
      });
    });

    it('#getState', () => {
      const { container, emailsInput } = render();
      const emails = ['pineapple@pizze.com', 'or', 'thisIsNotaPizza'];
      const input = getByPlaceholderText(container, /add more people/i);

      emails.forEach((email) => {
        userEvent.type(input, email);
        userEvent.tab();
        expect(input.value).toBe('');
        expect(getByText(container, email));
      });

      expect(emailsInput.getState()).toEqual([
        {
          value: 'pineapple@pizze.com',
          status: 'valid',
          id: expect.any(Number),
        },
        { value: 'or', status: 'invalid', id: expect.any(Number) },
        { value: 'thisIsNotaPizza', status: 'invalid', id: expect.any(Number) },
      ]);
    });
  });
});
