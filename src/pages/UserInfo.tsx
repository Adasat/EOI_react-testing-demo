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
            setFilteredList(data)

        }
        getUserFunction()
    }, [])

    const handleFilteredList = (user: string) => {
      console.log(typeof user)
        if(user !== ''){
          setFilteredList(list?.filter((e) => e?.name?.toLowerCase().includes(user.toLowerCase())))
        } else{
          setFilteredList(list)
        }
    } 

    const handleChange = (user: {name: string}): void => {
        setList((preList)=> { return [...preList, user];});
        setFilteredList((preList)=> { return [...preList, user];})
    }
    
    const removeUser = (userName: string) => {
      console.log('click on delete button')
      setList(list.filter((user) => user.name !== userName))
      setFilteredList(filteredList.filter((user) => user.name !== userName))
    }


    useEffect(() => {
    }, [list,filteredList]);

  return (
    <div id='userContainer'  data-testid='userContainer'>
        <FilterInput onInputChange={handleFilteredList}/>
     
      {
      
      filteredList.map((user, i) => (
        <div key={i} className='listContainer'>
          <li>{user.name}</li>
          <button
            className='deleteUser'
            aria-label='deleteBtn'
            onClick={() => removeUser(user.name)}
          ></button>
        </div>
      ))}

      <CustomForm handleChange={handleChange} />
    </div>
  )
}
