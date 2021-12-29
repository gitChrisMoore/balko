import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInputField from './TextInputField';

describe('<TextInputField />', () => {
  test('it should mount', () => {
    render(<TextInputField />);
    
    const textInputField = screen.getByTestId('TextInputField');

    expect(textInputField).toBeInTheDocument();
  });
});