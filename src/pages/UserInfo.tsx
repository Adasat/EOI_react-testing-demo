import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/userService';
import { CustomForm } from '../components/CustomButton/CustomForm';
import { MdDelete } from 'react-icons/md';

import './UserInfo.css'
import { FilterInput } from '../components/FilterInput/FilterInput';


export const UserInfo = () => {
    const [list, setList] = useState<any[]>([])
    const [count, setCount] = useState<Number>(5)
    const [filteredList, setFilteredList] = useState<any[]>([])

    useEffect(() => {
        let getUserFunction = async () => {
            const response = await getUsers(count)
            const data = await response.json();
            setList(data);
        }
        getUserFunction()
    }, [])

    const handleFilteredList = (user: string) => {
        setFilteredList(list?.filter((e) => e?.name?.toLoweCase().includes(user.toLowerCase())))
        console.log(filteredList)
    } 

    const handleChange = (user: {name: string}): void => {
        setList((preList)=> { return [...preList, user];});
    }
    
    const removeUser = (userName: string) => {
      console.log('click on delete button')
      setList(list.filter((user) => user.name !== userName))
    }

    const filteredInputHasInfo = () => {
        return filteredList.length > 0 ? filteredList : list
    }
    
    useEffect(() => {
      console.log(list);
    }, [list]);
    
  return (
    <div id='userContainer'  data-testid='userContainer'>
        <FilterInput onInputChange={handleFilteredList}/>
     
      {
      
      filteredInputHasInfo().map((user, i) => (
        <div key={i} className='listContainer'>
          <li>{user.name}</li>
          <MdDelete
            role='button'
            className='deleteUser'
            aria-label='deleteBtn'
            onClick={() => removeUser(user.name)}
          />
        </div>
      ))}

      <CustomForm handleChange={handleChange} />
    </div>
  )
}
