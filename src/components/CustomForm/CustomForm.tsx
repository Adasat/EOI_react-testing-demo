import React, { useState } from 'react'
import './CustomForm.css'

interface CustomFormProps {
  handleChange: (user: any) => void; // Specify the type of user if known, e.g., User or object
}

export const CustomForm = ({ handleChange }: CustomFormProps) => {
    const [newUser, setNewUser] = useState('')
    const [showMessage, setShowMessage] = useState('')

    const handleClick = () => {
      if (!newUser) {
        setShowMessage('Write the name of new user');
    } else {
        handleChange({ name: newUser });
        setShowMessage('');
        setNewUser('');
    }
    }
  return (
    <div id='form'>
      <input placeholder="User's name" onChange={(e) => setNewUser(e.target.value)} value={newUser} />
      <button onClick={handleClick}>Add User</button>
      {showMessage && (
        <p>{showMessage}</p>
      )}
    </div>
  )
}
