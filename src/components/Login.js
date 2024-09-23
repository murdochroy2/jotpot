import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
const Login = (props) => {
    const host = "http://localhost:5000"
    const emptyCredentials = { email: "", password: "" }
    const [credentials, setCredentials] = useState(emptyCredentials)
    const navigate = useNavigate()
    const {showAlert} = props
    const { setLoggedIn } = useContext(AuthContext)
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault()
        setCredentials(emptyCredentials)
        const url = `${host}/api/auth/login`
        const method = "POST"
        const requestInit = {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials) // body data type must match "Content-Type" header
        }
        const response = await fetch(url, requestInit)
        const json = await response.json()
        if (json.success) {
            console.log("Login Successful")
            localStorage.setItem('token', json.authToken)
            setLoggedIn(json.authToken)
            // redirect
            navigate("/")
            showAlert("success", "Logged in successfully")
        }
        else {
            showAlert("danger", "Invalid Credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login