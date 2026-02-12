import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApartmentSearchForm from './ApartmentSearchForm';

describe('ApartmentSearchForm', () => {
  beforeEach(() => {
    render(<ApartmentSearchForm />);
  });

  it('renders the form', () => {
    expect(screen.getByTestId('apartment-search-form')).toBeInTheDocument();
  });

  it('renders the title', () => {
    expect(screen.getByText(/אנחנו נעזור לך/)).toBeInTheDocument();
    expect(screen.getByText(/למצוא דירה!/)).toBeInTheDocument();
  });

  it('renders the location input with placeholder', () => {
    const input = screen.getByTestId('location-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'למשל: שמעון, ירושלים');
  });

  it('allows typing in the location input', () => {
    const input = screen.getByTestId('location-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'תל אביב' } });
    expect(input.value).toBe('תל אביב');
  });

  it('renders square meter chip options', () => {
    expect(screen.getByTestId('sqm-chip-90')).toBeInTheDocument();
    expect(screen.getByTestId('sqm-chip-88')).toBeInTheDocument();
    expect(screen.getByTestId('sqm-chip-150')).toBeInTheDocument();
    expect(screen.getByTestId('sqm-chip-200')).toHaveTextContent('+200');
  });

  it('toggles square meter chip on click', () => {
    const chip = screen.getByTestId('sqm-chip-90');
    expect(chip).not.toHaveClass('apartment-form__chip--active');

    fireEvent.click(chip);
    expect(chip).toHaveClass('apartment-form__chip--active');

    fireEvent.click(chip);
    expect(chip).not.toHaveClass('apartment-form__chip--active');
  });

  it('renders room chip options', () => {
    expect(screen.getByTestId('room-chip-1')).toBeInTheDocument();
    expect(screen.getByTestId('room-chip-2')).toBeInTheDocument();
    expect(screen.getByTestId('room-chip-3')).toBeInTheDocument();
    expect(screen.getByTestId('room-chip-4')).toBeInTheDocument();
    expect(screen.getByTestId('room-chip-5')).toBeInTheDocument();
    expect(screen.getByTestId('room-chip-6')).toHaveTextContent('+6');
  });

  it('toggles room chip on click', () => {
    const chip = screen.getByTestId('room-chip-3');
    fireEvent.click(chip);
    expect(chip).toHaveClass('apartment-form__chip--active');

    fireEvent.click(chip);
    expect(chip).not.toHaveClass('apartment-form__chip--active');
  });

  it('only allows one room chip active at a time', () => {
    const chip3 = screen.getByTestId('room-chip-3');
    const chip4 = screen.getByTestId('room-chip-4');

    fireEvent.click(chip3);
    expect(chip3).toHaveClass('apartment-form__chip--active');

    fireEvent.click(chip4);
    expect(chip4).toHaveClass('apartment-form__chip--active');
    expect(chip3).not.toHaveClass('apartment-form__chip--active');
  });

  it('renders the budget slider', () => {
    const slider = screen.getByTestId('budget-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('min', '200000');
    expect(slider).toHaveAttribute('max', '5000000');
  });

  it('updates budget display when slider changes', () => {
    const slider = screen.getByTestId('budget-slider');
    fireEvent.change(slider, { target: { value: '3000000' } });
    expect(screen.getByText(/3,000,000/)).toBeInTheDocument();
  });

  it('renders the purpose select with default value', () => {
    const select = screen.getByTestId('purpose-select') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('מגורים');
  });

  it('allows changing the purpose', () => {
    const select = screen.getByTestId('purpose-select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'השקעה' } });
    expect(select.value).toBe('השקעה');
  });

  it('renders the preferences textarea', () => {
    const textarea = screen.getByTestId('preferences-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'פרטו לנו כאן');
  });

  it('allows typing in preferences', () => {
    const textarea = screen.getByTestId(
      'preferences-textarea'
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'מרפסת גדולה' } });
    expect(textarea.value).toBe('מרפסת גדולה');
  });

  it('renders the dealbreakers textarea', () => {
    const textarea = screen.getByTestId('dealbreakers-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'פרטו לנו כאן');
  });

  it('renders email and phone inputs', () => {
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
  });

  it('allows typing in contact fields', () => {
    const email = screen.getByTestId('email-input') as HTMLInputElement;
    const phone = screen.getByTestId('phone-input') as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(phone, { target: { value: '0501234567' } });

    expect(email.value).toBe('test@example.com');
    expect(phone.value).toBe('0501234567');
  });

  it('renders the submit button', () => {
    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders the WhatsApp CTA button', () => {
    const button = screen.getByTestId('whatsapp-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('מעניין אותי');
  });

  it('submits the form without errors', () => {
    const form = screen.getByTestId('apartment-search-form');
    fireEvent.submit(form);
    expect(form).toBeInTheDocument();
  });

  // ===== Validation Tests =====

  it('shows error when typing numbers in location input', () => {
    const input = screen.getByTestId('location-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '123' } });
    expect(screen.getByTestId('location-error')).toHaveTextContent('ניתן להזין אותיות בלבד');
    expect(input.value).toBe('');
  });

  it('allows Hebrew letters in location input', () => {
    const input = screen.getByTestId('location-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ירושלים' } });
    expect(input.value).toBe('ירושלים');
    expect(screen.queryByTestId('location-error')).not.toBeInTheDocument();
  });

  it('shows error when typing numbers in preferences textarea', () => {
    const textarea = screen.getByTestId('preferences-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '123' } });
    expect(screen.getByTestId('preferences-error')).toHaveTextContent('ניתן להזין אותיות בלבד');
    expect(textarea.value).toBe('');
  });

  it('shows error when typing numbers in dealbreakers textarea', () => {
    const textarea = screen.getByTestId('dealbreakers-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '456' } });
    expect(screen.getByTestId('dealbreakers-error')).toHaveTextContent('ניתן להזין אותיות בלבד');
    expect(textarea.value).toBe('');
  });

  it('shows error when typing letters in phone input', () => {
    const input = screen.getByTestId('phone-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByTestId('phone-error')).toHaveTextContent('ניתן להזין מספרים בלבד');
    expect(input.value).toBe('');
  });

  it('allows numbers in phone input', () => {
    const input = screen.getByTestId('phone-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0501234567' } });
    expect(input.value).toBe('0501234567');
    expect(screen.queryByTestId('phone-error')).not.toBeInTheDocument();
  });

  it('shows error for invalid email', () => {
    const input = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'notanemail' } });
    expect(screen.getByTestId('email-error')).toHaveTextContent('כתובת אימייל לא תקינה');
  });

  it('clears email error for valid email', () => {
    const input = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
  });

  it('shows red border on invalid inputs', () => {
    const phone = screen.getByTestId('phone-input');
    fireEvent.change(phone, { target: { value: 'abc' } });
    expect(phone).toHaveClass('apartment-form__input--error');
  });
});
