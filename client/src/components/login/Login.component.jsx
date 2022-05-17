import {React, useState} from 'react'
import Axios from 'axios'


export default function Login() {
    const [usernameIpt, setUsernameIpt] = useState('')
    const [passwordIpt, setPasswordIpt] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    console.log(`USERNAME: ${usernameIpt}`)
    console.log(`PASSWORD: ${passwordIpt}`)

    const loginTo = () =>{
        Axios.post("http://localhost:8080/api/v1/login",{
            username: usernameIpt,
            password: passwordIpt,
        }).then((response)=>console.log(response))
    }

    
    return (
        <div className='login-modal'>
            <h1>Login</h1>
            <label htmlFor="uname">Username</label>
            <input 
            placeholder='Digite seu Username'
                name='uname'
                type="text" 
                onChange={(e)=>{setUsernameIpt(e.target.value)}}
            />
            <label htmlFor="pass">Password</label>
            <input 
                placeholder='Digite sua Senha'
                name='pass'
                type="password" 
                onChange={(e)=>{setPasswordIpt(e.target.value)}}
            />
            <button onClick={loginTo}>Login</button>
        </div>
    )
}

