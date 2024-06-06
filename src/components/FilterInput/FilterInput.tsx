import React, { ChangeEvent, useState } from 'react'

export const FilterInput = ({ onInputChange }: { onInputChange: (e: string) => void }) => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (value: string) =>  {
         setInputValue(value)
         onInputChange(value)
    }


  return (
    <>
        <input 
            placeholder='Search user...' 
            value={inputValue} 
            onChange={(e) => handleChange(e.target.value as string)}
        />
    </>
  )
}
