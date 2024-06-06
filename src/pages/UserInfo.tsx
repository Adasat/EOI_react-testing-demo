import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/userService';
import { CustomForm } from '../components/CustomButton/CustomForm';
import { MdDelete } from 'react-icons/md';

import './UserInfo.css'


export const UserInfo = (users: any) => {
    const [list, setList] = useState<any[]>([])
    const [count, setCount] = useState<Number>(5)

    useEffect(() => {
        let getUserFunction = async () => {
            const response = await getUsers(count)
            const data = await response.json();
            setList(data);
        }
        getUserFunction()
    }, [])

/*     const handleChange = (e: Event): void => {
        setList([...list, {name: (e.target as HTMLInputElement).value}])
    }
 */
    const handleChange = (user: {name: string}): void => {
        console.log(user)
        setList([...list, user])
        console.log(list)
    }
    
      const removeUser = (userName: string) => {
        setList(list.filter((user) => user.name !== userName))
      }
    

    
  return (
    <div>
      {/* <ul data-testid='userContainer'>
            {
                list.map((user, i) => (
                    <>
                    
                    <li key={i}>{user.name}</li>
                   <span><MdDelete /></span> 
                    </>
                ))
            }
        </ul> */}
      {list.map((user, i) => (
        <div key={i} id='listContainer' data-testid='userContainer'>
          <li>{user.name}</li>
          <MdDelete
            className='deleteUser'
            onClick={() => removeUser(user.name)}
          />
        </div>
      ))}

      <CustomForm handleChange={handleChange} />
    </div>
  )
}
