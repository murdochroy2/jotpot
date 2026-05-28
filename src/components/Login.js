import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import APP_NAME from '../config'

const Login = (props) => {
  const emptyCredentials = { email: "", password: "" }
  const [credentials, setCredentials] = useState(emptyCredentials)
  const port = process.env.REACT_APP_HOST_PORT
  const protocol = process.env.REACT_APP_HOST_PROTOCOL
  const host = `${protocol}://${process.env.REACT_APP_HOST}${port ? `:${port}` : ""}`
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(AuthContext)

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    setCredentials(emptyCredentials)
    const url = `${host}/api/auth/login`
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      setLoggedIn(json.authToken)
      navigate("/")
      props.showAlert("success", "Logged in successfully")
    } else {
      props.showAlert("danger", "Invalid credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="auth-card">
      <div className="auth-brand">✍ {APP_NAME}</div>
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Sign in to access your notes</p>

      <form onSubmit={handleLoginFormSubmit}>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="login-email">Email address</label>
          <input
            type="email"
            className="auth-input"
            id="login-email"
            name="email"
            placeholder="you@example.com"
            onChange={onChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="login-password">Password</label>
          <input
            type="password"
            className="auth-input"
            id="login-password"
            name="password"
            placeholder="Your password"
            onChange={onChange}
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="btn-auth-submit">Sign In</button>
      </form>

      <p className="auth-footer-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login
