import React from 'react';
import { render, screen, waitFor, fireEvent, getByText } from '@testing-library/react';
import App from '../App';
import { UserInfo } from './UserInfo';
import { log } from 'console';
import { act } from 'react-dom/test-utils';

let numOfPeople = 5
let users: any; 



describe ('Users test', () => {


  test('APP Should be show 5 users', () => {
    render(<App />);
    const element = screen.getByTestId('userContainer')
     // log(element.childElementCount)
    expect(element).toBeInTheDocument() 
  
  
    /* const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument(); */
  });
  
  test('userContainer should be have 5 children by default', async () => {
    await render(<App />);
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      expect(users).toHaveLength(numOfPeople)
    
  })

  test('addUserButton should increase numOfPeopleValue' , async () => {
    await render(<App/>)
      let button: any
      let newUsers: any
    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })
      button = screen.getByText('Add User')
    await waitFor (async () =>{

      fireEvent.click(button)

      newUsers = await screen.getAllByRole('listitem')
      console.log(newUsers.lenght)
    })
      expect(newUsers).toHaveLength(6)
    
  })

})




// APP Should be show 5 users and test it

