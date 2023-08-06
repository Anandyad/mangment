import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const clearError = (fieldName) => {
        
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: ''
        }));
    };

    const registerUser = async (ev) => {
        ev.preventDefault();
        const errors = {};
        if (!name) errors.name = "Name field is required";
        if (!email) errors.email = "Email field is required";
        if (!password) errors.password = "Password field is required";
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
       
        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            toast.success("Registration successful!");
        } catch (err) {
            toast.error("Registration failed", err);
        }
    };

    return (
        <>
            <div className="flex items-center mt-4 justify-around">
                <div className="">
                    <h1 className="text-4xl text-center my-2s">Register</h1>
                    <form className="max-w-md mx-auto" onSubmit={registerUser}>
                        <input
                            type="text"
                            value={name}
                            onChange={ev => {
                                setName(ev.target.value);
                                clearError('name');
                            }}
                            className=""
                            placeholder="Name"
                        />
                        <span className='text-red-500'>{validationErrors.name}</span>
                        <input
                            type="text"
                            value={email}
                            onChange={ev => {
                                setEmail(ev.target.value);
                                clearError('email');
                            }}
                            className=""
                            placeholder="youremail@email.com"
                        />
                        <span className='text-red-500'>{validationErrors.email}</span>
                        <input
                            type="password"
                            value={password}
                            onChange={ev => {
                                setPassword(ev.target.value);
                                clearError('password');
                            }}
                            className=""
                            placeholder="Password"
                        />
                        <span className='text-red-500'>{validationErrors.password}</span>
                        <button className="bg-primary text-white p-2 w-full border rounded-2xl">Register</button>
                        <div className="text-center my-2">
                            <span>Already have an account?</span>
                            <Link to={'/Login'} className="underline text-black"> Login </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
