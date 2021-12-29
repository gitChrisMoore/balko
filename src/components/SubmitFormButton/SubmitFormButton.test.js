import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubmitFormButton from './SubmitFormButton';

describe('<SubmitFormButton />', () => {
  test('it should mount', () => {
    render(<SubmitFormButton />);
    
    const submitFormButton = screen.getByTestId('SubmitFormButton');

    expect(submitFormButton).toBeInTheDocument();
  });
});