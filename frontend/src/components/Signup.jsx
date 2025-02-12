/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { handlerror, handleSuccess } from './util';
import {  useNavigate } from 'react-router';
import {base_url}  from '../../Hunter';
function Signup() {

    const [signupInfo , setsignupInfo] = useState({
        name : '',
        email:'',
        password : ''
    })
    const navigate = useNavigate();
    const handleChange = (e) =>  {
        const {name , value}  = e.target;
        console.log(name , value); 
        const copysingupInfo = {...signupInfo};
        copysingupInfo[name] = value;
        setsignupInfo(copysingupInfo);
    }

    const handleh = () =>{
        navigate("/Login");
    }
    const handleSignup = async(e) => {
        e.preventDefault();
        const {name , email , password} = signupInfo;
        if(!name || !email || !password){
            return handlerror('name , email ,password are required ! ');
        }
        try{
            const url = `${base_url}/Signup`;
            const response = await fetch(url , {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(signupInfo)
            });
            const result = await response.json();
            console.log(result);
            const {success , message} = result;
            if(success){
                handleSuccess(message)
                navigate('/Login')
            }
        }
        catch(err){
            console.log("error");
            handlerror(err);
        }
    }
    return (
        <div className="signup-container">
            <h1 className="signup-heading">Signup</h1>
            <form className="signup-form" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name" className="signup-label">Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        className="signup-input"
                        autoFocus
                        placeholder="Enter your name"
                        value={signupInfo.name}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        className="signup-input"
                        autoFocus
                        placeholder="Enter your email"
                        value={signupInfo.email}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        className="signup-input"
                        autoFocus
                        placeholder="Enter your password"
                        value={signupInfo.password}
                    />
                </div>

                <button className="signup-btn" type = "submit">Signup</button>
                <div className="signup-link">
                    Already have an account? <button onclick = {handleh}>Login</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Signup;