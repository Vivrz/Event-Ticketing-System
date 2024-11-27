
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { handlerror, handleSuccess } from './util';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './signup.css';

function OrganiserSignup() {
    const [signupInfo, setsignupInfo] = useState({
        name: '',
        email: '',
        password: ''
       
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setsignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        
        if (!name || !email || !password) {
            return handlerror('Name, email, and password are required!');
        }

        try {
            const url = "http://localhost:5000/Organiser-Signup"; 
            const response = await axios.post(url, signupInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/organiser-login'); 
                }, 1000);
            } else {
                handlerror(message);
            }
        } catch (err) {
            handlerror(err.message || 'An error occurred while signing up');
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-heading">Organiser Signup</h1>
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
                        placeholder="Enter your password"
                        value={signupInfo.password}
                    />
                </div>

                <button className="signup-btn" type="submit">Signup</button>
                <div className="signup-link">
                    Already have an account? <a href="/organiser-login">Login</a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default OrganiserSignup;