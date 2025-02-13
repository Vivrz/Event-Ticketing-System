import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import { base_url } from '../../Hunter';
function OrganiserSignup() {
    const [signupInfo, setsignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignupInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return toast.error('Name, email, and password are required!');
        }

        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validateEmail(email)) {
            return toast.error('Please enter a valid email address!');
        }

        if (password.length < 6) {
            return toast.error('Password must be at least 6 characters long!');
        }

        try {
            const url = `${base_url}/Organiser-Signup`;
            const response = await axios.post(url, signupInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { success, message } = response.data;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    navigate('/OrganiserLogin');
                }, 1000);
            } else {
                toast.error(message);
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message || 'An error occurred on the server');
            } else {
                toast.error(err.message || 'Network error occurred');
            }
        }
    };

    const handleLogin = () => {
        navigate('/OrganiserLogin');
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
                    Already have an account? <a href="#" onClick={handleLogin}>Login</a>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default OrganiserSignup;