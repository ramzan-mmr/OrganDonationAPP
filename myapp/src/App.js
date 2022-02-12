import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Row, Form, Col, Button } from 'react-bootstrap'

function App() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function handleLogin(){
    const credentials = {
      "Email": Email,
      "Password":Password 
  }
    console.log(credentials)
    // handleMessage(null);
    const url = 'https://mydonatmeapi.herokuapp.com/Login';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          // handleMessage(message, status);
          console.log(status)
        } else {
          // persistLogin({ ...data[0] }, message, status, data);
          //   persistLogin({data}, message, status);
          console.log(data)
        }
        // setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
        // setSubmitting(false);
        // handleMessage('An error occurred. Check your network and try again');

      });
  };
  // useEffect(()=>{
  //   handleLogin();
  // })
  return (
    <form>
      <label>
        Email:
        <input type="email" value={Email} name="name" onChange={(e)=>setEmail(e.target.value)}/>
      </label>
      Password
      <input type="password" value={Password} name="name" onChange={(e)=>setPassword(e.target.value)} />
      <input type="submit" value="Submit" onClick={()=>handleLogin()}/>
    </form>
  );
}

export default App;
