import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handleAddUser=(event)=>{
    event.preventDefault();
    // console.log("handle add user clicked");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    // console.log(name, email);
    // const email = form.email
    const user = {name, email}
    // console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.acknowledged){
        alert("User Added Successfully")
      }
      // const newUser = [...users, data];
      // setUsers(newUser)
    })
  }

  return (
    <div>
      <h2>{users.map(user=><li key={user.name}>{user.name}</li>)}</h2>

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='User Name'/><br/>
        <input type="text" name='email' required placeholder='User Email'/><br/>
        <input type="submit" value='Add User'/>

      </form>
    </div>
  )
}

export default App
