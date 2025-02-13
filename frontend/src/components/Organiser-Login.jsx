
import { useState } from 'react';
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import { handlerror, handleSuccess } from './util';
import { useNavigate } from 'react-router';
import { base_url } from '../../Hunter';
function OrganiserLogin() {
    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handle = () => {
        navigate('/OrganiserSignup');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;

        if (!email || !password) {
            return handlerror('Email and password are required!');
        }

        try {
            const url = `${base_url}/Organiser-Login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result = await response.json();
            const { success, message, jwtoken, name } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtoken);
                localStorage.setItem('loggedInUser', name);
                console.log("User logged in");
                navigate('/Events'); 
            } else {
                handlerror(message);
            }
        } catch (err) {
            handlerror(err.message || 'Something went wrong!');
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-heading">Organiser Login</h1>
            <form className="signup-form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        className="signup-input"
                        autoFocus
                        placeholder="Enter your email"
                        value={LoginInfo.email}
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
                        value={LoginInfo.password}
                    />
                </div>

                <button className="signup-btn" type="submit">Login</button>
                <div className="signup-link">
                    Don't have an account? <button onClick={handle}>Signup</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default OrganiserLogin;
