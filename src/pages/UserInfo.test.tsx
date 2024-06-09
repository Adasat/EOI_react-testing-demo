import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getUsers } from '../services/userService';
import { UserInfo } from './UserInfo';

let numOfPeople = 5
let users: any;
jest.mock('../services/userService', () => ({
  getUsers: jest.fn(),
}));

describe.skip('Unit test', () => {
  beforeEach(() => {
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'John Smith' },
        { name: 'Jane Smith' },
        { name: 'faS Doe' },
      ])
    }));
  });

  test('Userinfo should recieve an any object as promise', async () => {
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve({
      json: () => []
    }));
    await render(<UserInfo />);
    await waitFor(async () => {
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })
  })
  test('deleteUserButton should not exist on the list if its empty', async () => {
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve({
      json: () => []
    }));
    render(<UserInfo />)
    await waitFor(async () => {
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    })
  })

  test('deleteUserButton should remove users from list', async () => {
    await render(<UserInfo />)
    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })
    expect(users).toHaveLength(5)

    const deleteButtons = screen.getAllByText('Delete') as unknown as HTMLElement[]
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })

    expect(users).toHaveLength(4)
  })
})
describe('Functional test', () => {

  beforeEach(() => {
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([
        { name: 'John Doe' },
        { name: 'Jane Doe' },
        { name: 'John Smith' },
        { name: 'Jane Smith' },
        { name: 'faS Doe' },
      ])
    }));
  });
  afterEach(() => {
    numOfPeople = 5
  })

  test('userContainer should be have 5 children by default', async () => {
    await render(<UserInfo />);
    await waitFor(() => {
      users = screen.getAllByRole('listitem')
    })
    expect(users).toHaveLength(numOfPeople)

  })

  test.skip('addUserButton should increase numOfPeopleValue', async () => {
    render(<UserInfo />)
    const button = screen.getByText('Add User');
    let newUsers : any
     newUsers = await screen.findAllByRole('listitem')
    // Fire event and then wait for expected changes

    let input = screen.getByPlaceholderText('Search user...')
    fireEvent.change(input, { target: { value: 'New User' } });

    fireEvent.click(button);
    numOfPeople++
    
    await waitFor(async () => {
      newUsers = await screen.findAllByRole('listitem')
    }, { timeout: 4000 })
    
    expect(newUsers).toHaveLength(numOfPeople)
  })

  describe('Filters tests', () => {

    test('FilterInput element should exist on the document', async () => {
      await render(<UserInfo />)
      let input = screen.getByPlaceholderText('Search user...')
      expect(input).toBeInTheDocument()
    })

    test('filter input should filter data from ul list', async () => {
      await render(<UserInfo />)
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      let input = screen.getByPlaceholderText('Search user...')
      fireEvent.change(input, { target: { value: 'Jane Doe' } })
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      expect(users).toHaveLength(1)


    })
    test('5 items should exist if filter input is empty', async () => {
      await render(<UserInfo />)
      let input = screen.getByPlaceholderText('Search user...')
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      fireEvent.change(input, { target: { value: '' } })
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      expect(users).toHaveLength(numOfPeople)
    })

    //TODO: fix this test :)
    test('user list should be empty if filter cant find any coincidences', async () => {
      await render(<UserInfo />)
      let input = screen.getByPlaceholderText('Search user...')
      await waitFor(() => {
        users = screen.getAllByRole('listitem')
      })
      fireEvent.change(input, { target: { value: 'Non-existing user' } })
      await waitFor(() => {
        users = screen.queryAllByRole('listitem')
      })
      expect(users).toHaveLength(0)
    })
  })

})
