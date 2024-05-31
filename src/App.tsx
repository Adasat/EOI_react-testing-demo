import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserInfo } from './pages/UserInfo';
import { getUsers } from './services/userService';

function App() {
  const [list, setList] = useState<any[]>([])

    useEffect(() => {
        let getUserFunction = async () => {
            const response = await getUsers()
            const data = await response.json();
            setList(data);
        }
        getUserFunction()
        console.log(list)
    }, [])
  return (
    <div className="App">
      <header className="App-header">       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <UserInfo users={list as any}/>
      </header>
    </div>
  );
}

export default App;
