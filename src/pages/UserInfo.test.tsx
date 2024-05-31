import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { UserInfo } from './UserInfo';
import { log } from 'console';

test('APP Should be show 5 users', () => {
  render(<App />);
  const element = screen.getByTestId('userContainer')
    log(element.childElementCount)
  expect(element).toBeInTheDocument() 


  /* const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); */
});

test('userContainer should be have 5 children', () => {
    render(<App />);
    const users = screen.getAllByRole('listitem')
    expect(users).toHaveLength(5)
})




// APP Should be show 5 users and test it

