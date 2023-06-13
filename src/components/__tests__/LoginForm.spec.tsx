import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

const TEST_PASSWORD_VALUE = 'testPassword';
const TEST_EMAIL_VALUE = 'testEmail@email.com';

describe('LoginForm: Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should call handleFinish with correct payload on submit', async () => {
    const handleFinishMock = jest.fn();
    render(<LoginForm handleFinish={handleFinishMock} />);

    const passwordInput = screen.getByPlaceholderText('password');
    const emailInput = screen.getByPlaceholderText('email');

    expect(screen.getByTestId('LoginForm.Form')).toBeInTheDocument();
    fireEvent.input(emailInput, TEST_EMAIL_VALUE);
    fireEvent.input(passwordInput, TEST_PASSWORD_VALUE);

    await act(() => fireEvent.submit(screen.getByText('Submit')));

    setTimeout(() => {
      expect(handleFinishMock).toBeCalledWith({
        email: TEST_EMAIL_VALUE,
        password: TEST_PASSWORD_VALUE,
      });
    }, 0);
  });
});
