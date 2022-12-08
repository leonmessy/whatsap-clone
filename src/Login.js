import React from 'react'
import "./Login.css";
import { Button } from '@mui/material';
import { auth , provider} from './Firebase';
import { actionTypes } from './Reducer';
import {useStateValue} from "./Stateprovider"
function Login() {
    const [{}, dispatch]=useStateValue();
   const signIn= ()=>{
auth.signInWithPopup(provider).then
((result) =>{
    dispatch({type:actionTypes.SET_USER,
    user:result.user})
}).
catch(error=>alert(error.message))
   } 
  return (
    <div className= "login">
        <div className="login_container">
<img
src ="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg"
 alt=""
/>  
<div className="login_text">
    <h1>Sign in to whatsapp</h1>
</div>
<Button onClick = {signIn}>
    Sign In With Google
</Button>
      </div>
    </div>
  )
}

export default Login