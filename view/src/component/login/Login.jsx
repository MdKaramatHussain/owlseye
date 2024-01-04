import axios from "axios"
import { useState } from "react"
import {useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useNavigate() // from this navigate in next js
    const [error, setError] = useState('')
    // axios.defaults.withCredentials = true;
    axios.defaults.withCredentials = true

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4000/api/admin/user/login', { email, password })
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data)
                    router('/')
                } else {
                    setError(res.data.error);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div style={{ backgroundImage: `url("https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?w=1480&t=st=1698318427~exp=1698319027~hmac=eee575b70d84b4d3ec7752622e053346c20a9b78c97ca1277e7ecb73860a1e3e")` }}>
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage ' >
                <div className='p-3 rounded w-25 border loginForm'>
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <h2 style={{ color: 'white' }}>Login</h2>
                    {/* <form onSubmit={handleLogin}> */}
                    <form>
                        <div className='mb-3'>
                            <label htmlFor="email" style={{ color: 'white' }}><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' name='email'
                                className='form-control rounded-0' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" style={{ color: 'white' }}><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' name='password'
                                className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type='submit' className='btn btn-primary w-100 rounded-0' onClick={handleLogin}>Log in</button>
                        <p style={{ color: 'white' }}>If you don't have account Then you must have to
                            Sign Up
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
