import React, { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

const UserLogin = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const payload = {
            email : data.get("email") as string,
            password : data.get("password") as string
        }

        const url = `${API_URL}/user/userLogin`
        const option = {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            body: JSON.stringify({loginData:payload})
        }  as RequestInit
        
        const response = await fetch(url,option) 
        const resData = await response.json()

        if(resData.success){
            navigate("/Home")
            localStorage.setItem("userData", JSON.stringify(resData.data));
        }else{
            alert(resData.message)
        }
        
    }

  return (
    <div className='main-container'>
        <div className='body-container'>
            <div className='body-sub-container'>
                <div className='body-header'>
                    LOGIN PAGE
                </div>
                <div className='body-content'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label>Email :</label> 
                            <input type='email' name='email' required placeholder='Enter Email' />
                        </div>
                        <div className='input-container'>
                            <label>Password :</label> 
                            <input type='password' name="password" required placeholder='Enter Password' />
                        </div>
                        <div  className='submit-container'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserLogin