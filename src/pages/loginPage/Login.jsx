import React, { useState } from 'react'
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {

    const navigate=useNavigate();
    const [inputValue, setInputValue] = useState({
        username:'',
        password:''
    });

    const handleInput=(e)=>{
        const{name,value}=e.target;
        setInputValue({...inputValue,[name]: value})
    }

    const submitForm =(e)=>{
        e.preventDefault();
        console.log(inputValue);
        const authToken='myAuthToken';
        sessionStorage.setItem('authToken',authToken);

        if(inputValue.username === inputValue.password){
            alert("Login Successful!");
            navigate('/orders');
        }else{
            alert("Please Enter Valid Credentials!");
        }
    }

    return (
        <>
            <Header/>
            <div className="login-container">
                <form className='login-form' id='login-form'>
                    <h1>Sign In</h1>
                    <input className='login-field' type='text' name='username' value={inputValue.username} placeholder='Enter Username' onChange={handleInput}/>
                    <input className='login-field' type='password' name='password' value={inputValue.password} placeholder='Enter Password' onChange={handleInput}/>
                    <input className='login-button' type='submit' value='Login' onClick={submitForm} />
                </form>
            </div>
        </>
    )
}

export default Login;
