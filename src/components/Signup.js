import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Signup = (props) => {
  const port = process.env.REACT_APP_HOST_PORT
  const protocol = process.env.REACT_APP_HOST_PROTOCOL
  const host = `${protocol}://${process.env.REACT_APP_HOST}${port ? port : ""}`
  const emptyCredentials = { name: "", email: "", password: "", cpassword: "" }
  const [credentials, setCredentials] = useState(emptyCredentials)
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(AuthContext)
  const {configureAlert: showAlert} = props
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSignupFormSubmit = async (e) => {
    const {name, email, password} = credentials
    e.preventDefault()
    setCredentials(emptyCredentials)
    const url = `${host}/api/auth/createuser`
    const method = "POST"
    const requestInit = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password}) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, requestInit)
    const json = await response.json()
    if (json.success) {
        console.log("Signup Successful")
        localStorage.setItem('token', json.authToken)
        setLoggedIn(json.authToken)
        // redirect
        navigate("/")
        props.showAlert("success", "Signup Successful")
    }
    else {
        props.showAlert("danger", "Invalid Credentials")
    }
}
  return (
    <div className='container'>
      <form onSubmit={handleSignupFormSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" onChange={onChange} name='name'/>
          <div id="nameHelp" className="form-text">We'll never share your details with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name='email'/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleConfirmPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="exampleConfirmPassword1" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
  )
}

export default Signup