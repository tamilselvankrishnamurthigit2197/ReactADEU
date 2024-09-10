import React, { useState } from "react"
import { v4 as uuid } from 'uuid'
import './App.css'

const App = () =>{
  /* to store the userInfo in a user array */
const [users, setUsers] = useState([])

/* to handle add, delete, edit, update, handle data */
const [userInfo, setUserInfo] = useState({
  id:uuid(),
  name:"",
  age:"",
  email:"",
  phone:""
})

/* handle change function for input changing */

const handleChange = (e) =>{
  const {name, value} = e.target;
  setUserInfo((currInfo)=>{
    return {...currInfo, [name]:value}
  })
}

/* add new userInfo to user array */
const addData = () =>{
  setUsers((currUsers)=> [...currUsers, userInfo]);
  setUserInfo({
    id:uuid(),
    name:"",
    age:"",
    email:"",
    phone:""
  })
}

/* delete userInfo passing specific id  */

const deleteData = (id) =>{
  setUsers((currUsers)=>{
    return currUsers.filter((user)=>{
      user.id !== id;
    })
  })
}

/* to hold the add state initially in form:button input */
const [buttonState, setButtonState] = useState("add")

/* start edit, while clicking edit button */
const startEditing = (user)=>{
  setUserInfo(user);
  setButtonState("edit");
}

/* cancel Edit once and show only add button and clear the input field of userInfo */
const cancelEditing = ()=>{
  setUserInfo({
    id:uuid(),
    name:"",
    age:"",
    email:"",
    phone:""
  })
  setButtonState("add");
}

/* update Data with comparision of user.id and edited userInfo.Id and return either userInfo or old user-info and clears input once using cancel editing */
const updateData = () =>{
  setUsers((currUsers)=> {
    return currUsers.map((user)=>{
      if (user.id === userInfo.id) {
        return userInfo;
      }
      return user;
    })
  })
  cancelEditing();
}
return(
  <div className="container">
    <div className="form">
      <input
        type="text" value={userInfo.name} name="name"
        placeholder="Enter Name" onChange={handleChange} />
      <br />
      <input
        type="number" value={userInfo.age} name="age"
        placeholder="Enter Age" onChange={handleChange} />
      <br />
      <input
        type="text" value={userInfo.email} name="email"
        placeholder="Enter E-mail" onChange={handleChange} />
      <br />
      <input
        type="number" value={userInfo.phone} name="phone"
        placeholder="Enter Phone No." onChange={handleChange} />
      <br />
      {
        buttonState === "add" ? (
          <button onClick={addData}>Add</button>
        ):(
          <div className="buttonContainer">
            <button onClick={updateData}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        )
      }
    </div>

    <div className="dataTable">
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user)=>{
              return(
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={()=>startEditing(user)}>Edit</button>
                    <button onClick={()=>deleteData(user.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
    </div>
  </div>
)
}

export default App