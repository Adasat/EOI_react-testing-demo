import React from 'react';
import { render, screen, waitFor, fireEvent, getByText, getByTestId } from '@testing-library/react';
import App from '../App';

let numOfPeople = 5
let users: any; 



describe ('Users test', () => {

  afterEach(() => {
    numOfPeople = 5
  })

  // test('APP Should be show 5 users', () => {
  //   render(<App />);
  //   const element = screen.getByTestId('userContainer')
  //   expect(element).toBeInTheDocument() 

  // });

  
  
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

    await waitFor (() =>{

      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(button)
      numOfPeople++
    })
      newUsers = screen.getAllByRole('listitem')
      expect(newUsers).toHaveLength(numOfPeople)
  })

  test('deleteUserButton should exist on the list', () => {
    render(<App/>)
    const deleteButton = screen.getByRole('button', { name: 'deleteBtn'})
    expect(deleteButton).toBeDefined()
  })

  test('deleteUserButton should remove users from list', async () => {
    render(<App/>)
    const deleteButton = screen.getAllByRole('button', { name: 'deleteBtn'})
    console.log(deleteButton)
    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })

    expect(users).toHaveLength(4)
  })
  test('filter input should filter data from ul list', async () => {
    render(<App/>)
    const deleteButton = screen.getByLabelText('deleteBtn')
    console.log(deleteButton)
    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })

    expect(users).toHaveLength(4)
  })
})
