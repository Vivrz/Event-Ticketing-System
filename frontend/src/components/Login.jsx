import { useState } from 'react';
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import { handlerror, handleSuccess } from './util';
import { useNavigate } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { base_url } from '../../Hunter';
import HomePage from './Home';

function Login() {
    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...LoginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;
        if (!email || !password) {
            return handlerror('Email and password are required!');
        }
        try {
            const url = `${base_url}/Login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const result = await response.json();
            console.log(result);
            const { success, message, jwtoken, name } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtoken);
                localStorage.setItem('loggedInUser', name);
                navigate('/HomePage');
            }
        } catch (err) {
            console.log("error");
            handlerror(err);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            // Handle user details (e.g., save to backend if required)
            localStorage.setItem('loggedInUser', user.displayName);
            handleSuccess(`Welcome, ${user.displayName}!`);
            navigate('/HomePage');
        } catch (error) {
            console.error(error);
            handlerror(error.message);
        }
    };

    const handleSignupNavigation = () => {
        navigate('/Signup');
    };

    return (
        <div className="signup-container">
            <h1 className="signup-heading">Login</h1>
            <form className="signup-form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
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
                        type="password"
                        name="password"
                        className="signup-input"
                        placeholder="Enter your password"
                        value={LoginInfo.password}
                    />
                </div>

                <button className="signup-btn" type="submit">Login</button>

                <div className="button-group">
                    <button
                        type="button"
                        className="google-signin-btn"
                        onClick={handleGoogleSignIn}
                    >
                        Sign In with Google
                    </button>
                </div>

                <div className="signup-link">
                    Don't have an account? <button onClick={handleSignupNavigation}>Signup</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;
