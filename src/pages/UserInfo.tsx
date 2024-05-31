import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/userService';

export const UserInfo = (users: any) => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        let getUserFunction = async () => {
            const response = await getUsers()
            const data = await response.json();
            setList(data.splice(0,5));
        }
        getUserFunction()
        console.log(list)
    }, [])

    

    
  return (
    <div>
        <ul data-testid='userContainer'>
            {
                list.map((user, i) => (
                    <li key={i}>{user.name}</li>
                ))
            }
        </ul>
    </div>
  )
}
