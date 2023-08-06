import { useState } from "react"
import { Link } from "react-router-dom"
import axios, { Axios } from "axios";
import {ToastContainer, toast } from "react-toastify";
const Login = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    function LoginUser(ev) {
        debugger
        ev.preventDefault();
        try{
        axios.post('/Login',{
            email,
            password
           
        });
        toast.success('Login Succesfull')
    }
        catch(err){
            toast.error("Login Failed")
        }
    }
    return (
        <>
            <div className="flex  items-center   mt-4  justify-around ">

                <div className="">
                    <h1 className="text-4xl text-center  my-2s">Login</h1>
                    <form className="max-w-md   mx-auto  " onSubmit={LoginUser}>
                        <input type="text"
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} 
                            className=""
                            placeholder="youremail@email.com" />
                        <input type="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className=" "
                        placeholder="***********" />

                        <button className="bg-primary text-white p-2  w-full  border  rounded-2xl">Login</button>
                        <div className="text-center my-2">
                            <span>Don't have  an acount yet ?</span>

                            <Link to={'/Register'} className="underline text-black"> Register  </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Login
